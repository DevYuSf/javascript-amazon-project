class Cart{
    cartItem;
    #localStorageKey;
    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey;
        this.loadFromStorage();
    }

    loadFromStorage(){
        this.cartItem = JSON.parse(localStorage.getItem(this.#localStorageKey));
    
        if (!this.cartItem) {
           this.cartItem =  [{
            productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity:2,
            deliveryOptionId:'1'
        },{
            productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity:1,
            deliveryOptionId:'2'
        }]
        }
    }

    saveToStorage(){
        localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItem));
    }

    addToCart(productId){
        let machingItem;
    
            this.cartItem.forEach((cartItem)=>{
                if (productId === cartItem.productId) {
                    machingItem = cartItem;
                }
            });
    
            if (machingItem) {
                machingItem.quantity+=1;
            } else {
                this.cartItem.push({
                productId:productId,
                quantity:1,
                deliveryOptionId:'1'
            });
            } 
            this.saveToStorage();
    }

    removeFromCart(productId){
        const newCart = [];
        this.cartItem.forEach((cartItem)=>{
            if (productId !== cartItem.productId) {
                newCart.push(cartItem);
            };
        })
    
        this.cartItem = newCart;
        this.saveToStorage();
    }

    calculateCartQuantity(){
        let cartQuantity = 0;
    
        this.cartItem.forEach((cartItem)=>{
            cartQuantity+=cartItem.quantity;
        });
        return cartQuantity;
    }

    updateDeliveryOptions(productId,deliveryOptionId) {
        let machingItem;
    
            this.cartItem.forEach((cartItem)=>{
                if (productId === cartItem.productId) {
                    machingItem = cartItem;
                }
            });
        machingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
    }
}



const cart = new Cart("cart-oop");

const businessCart = new Cart('business-cart');
cart.addToCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e")
console.log(cart);

console.log(businessCart);
console.log(businessCart instanceof Cart)