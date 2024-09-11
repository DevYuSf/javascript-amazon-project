import { formatCurrency } from "../scripts/utily/money.js";

describe("Test suite: formatCurrency",()=>{
    it("converts cents into dollers",()=>{
        expect(formatCurrency(2095)).toEqual("20.95");
    });
    it("rounding to the nearest cents",()=>{
        expect(formatCurrency(2000.5)).toEqual("20.01")
    });
    it("works with 0",()=>{
        expect(formatCurrency(0)).toEqual("0.00")
    });
})
// console.log("Test suite: formatCurrency")
// console.log("rounding to the nearest cents")
// if (formatCurrency(2000.4) === "20.00") {
//     console.log("passed")
// } else {
//     console.log("failed")
// };

// console.log("converts cents to doller")
// if (formatCurrency(2095) === "20.95") {
//     console.log("passed")
// } else {
//     console.log("failed")
// };

// console.log("working with 0")
// if (formatCurrency(0) === "0.00") {
//     console.log("passed")
// } else {
//     console.log("failed")
// };

