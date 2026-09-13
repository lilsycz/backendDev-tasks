type mathCallback= (num:number) => void;
const calculate = (a:number, b:number, addUp:mathCallback) => {
    console.log (`Calculating: `, a,`+`,b );
    setTimeout(() => {
        const addUp = a+b;
        printResult(addUp);
    }, 2000);
};

const printResult: mathCallback = (num: number) => {
    console.log(num);
};

calculate (2,5,printResult);