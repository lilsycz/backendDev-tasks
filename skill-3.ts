type ConvertCallback = (celsius: number) => number;

const convertTemperature = (celsius: number, callback: ConvertCallback) => {
    callback(celsius);
};

const F = convertTemperature(15, (celsius) => celsius*9/5+32);
console.log (F);
const K = convertTemperature(15, (celsius) => celsius+273.15);
console.log (K);
