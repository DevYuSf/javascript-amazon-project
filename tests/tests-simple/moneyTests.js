import { formatCurrency } from "../../scripts/utily/money.js";
console.log("Test suite: formatCurrency")
console.log("rounding to the nearest cents")
if (formatCurrency(2000.4) === "20.00") {
    console.log("passed")
} else {
    console.log("failed")
};

console.log("converts cents to doller")
if (formatCurrency(2095) === "20.95") {
    console.log("passed")
} else {
    console.log("failed")
};

console.log("working with 0")
if (formatCurrency(0) === "0.00") {
    console.log("passed")
} else {
    console.log("failed")
};

console.log("working with negative number")
if (formatCurrency(-2002) === "-20.02") {
    console.log("passed")
} else {
    console.log("failed")
};

