import {cart,removeFromCart,calculateCartQuantity,updateDeliveryOptions} from '../../data/cart.js';
import { products,getProduct } from '../../data/products.js';
import { formatCurrency } from '../utily/money.js';
import {deliveryOptions,getDeliveryOption} from '../../data/deliveryOptions.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSummary(){
    let cartSummary = '';

    cart.forEach((cartItem)=>{
        //console.log(cartItem)
        let {productId} = cartItem;
    const matchingProduct=getProduct(productId);

        const deliveryOptionId = cartItem.deliveryOptionId;
        let deliveryOption=getDeliveryOption(deliveryOptionId);
        const toDay = dayjs();
        const deliveryDate = toDay.add(
            deliveryOption.deliveryDays,
            'days'
            );
        const dateString = deliveryDate.format('dddd, MMMM D');

        // console.log(matchingProduct);
        cartSummary+=`
            <div class="cart-item-container 
            js-cart-item-container
            js-cart-item-container-${matchingProduct.id}
            ">
                <div class="delivery-date">
                    Delivery date: ${dateString}
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image"
                    src="${matchingProduct.image}">

                    <div class="cart-item-details">
                    <div class="product-name">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                        ${matchingProduct.getPrice()}
                    </div>
                    <div class="product-quantity
                    js-product-quantity-${matchingProduct.id}
                    ">
                        <span>
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary">
                        Update
                        </span>
                        <span class="delete-quantity-link js-delete-quantity-link link-primary
                        js-delete-link-${matchingProduct.id}
                        " data-product-id = ${matchingProduct.id}>
                        Delete
                        </span>
                    </div>
                    </div>

                    <div class="delivery-options">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
                        ${deliveryOptionsHTML(matchingProduct,cartItem)}
                    </div>
                </div>
            </div>
        `;
    });

    document.querySelector(".js-order-summary").innerHTML = cartSummary;

    document.querySelectorAll(".js-delete-quantity-link")
        .forEach((link)=>{
            link.addEventListener("click",()=>{
                const productId = link.dataset.productId;
                removeFromCart(productId);
                const product = document.querySelector(
                    `.js-cart-item-container-${productId}`
                );
                product.remove();
                updateCartQuantity()
                renderPaymentSummary();
            })
        });


    function deliveryOptionsHTML(matchingProduct,cartItem) {
        let html = "";
        deliveryOptions.forEach((deliveryOption)=>{
            const toDay = dayjs();
            const deliveryDate = toDay.add(
            deliveryOption.deliveryDays,
                'days'
            );
            const dateString = deliveryDate.format('dddd, MMMM D');
            const priceString = deliveryOption.priceCents === 0 ? "FREE" : `$${formatCurrency(deliveryOption.priceCents)} -`;
            const isChecked =deliveryOption.id === cartItem.deliveryOptionId;

            html+= `
            <div class="delivery-option 
            js-delivery-option"
            data-product-id = ${matchingProduct.id}
            data-delivery-option-id = ${deliveryOption.id}
            >
                <input type="radio"
                ${isChecked ? 'checked' : ""}
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${priceString} Shipping
                </div>
                </div>
            </div>
        
        `
        });
        return html;
    
    }

    function updateCartQuantity(){
    
        document.querySelector(".js-return-to-home-link").innerHTML=`${calculateCartQuantity()} items`
        
    };
   updateCartQuantity();

    document.querySelectorAll('.js-delivery-option')
        .forEach((element)=>{
            element.addEventListener('click',()=>{
                const {productId,deliveryOptionId} = element.dataset;
                updateDeliveryOptions(productId,deliveryOptionId);
                renderOrderSummary();
                renderPaymentSummary();
            })
        });

};





