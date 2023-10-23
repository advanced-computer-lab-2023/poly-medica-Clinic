export const calcPrice =  (price) => {
    const userDiscount = 0.2; // needs user to get the id to get the discount
    const priceWithDiscount = price * (1 - userDiscount);
    const final = 1.1 * priceWithDiscount;
    return final.toFixed(2);
};