type OrderCallback = () => void
const placeOrder =(item:string, callback:OrderCallback)  => {
    console.log (`Order placed for ${item}`);
    callback();
};

const order = (() => {
    const msg = `Thanks for your order!`;
    console.log(msg);
});

placeOrder(`Pizza`, order);