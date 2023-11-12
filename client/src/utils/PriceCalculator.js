export const calcPrice =  (price, userDiscount) => {
    const priceWithDiscount = price * (1 - userDiscount);
    const final = 1.1 * priceWithDiscount;
    return final.toFixed(2);
};