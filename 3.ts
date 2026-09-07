type mathCallback= (num:number) => void;
const addUp = (a:number, b:number, callback:mathCallback) => {
    callback(a+b)
};

const printResult: mathCallback = (num: number) => {
    console.log(num);
};

addUp(2,5,printResult);