type helloFunction= (message:string) => void;

const greet = (callBack: helloFunction): void => {
    setTimeout(() => {
        const hi = `Hello from callback!`;
        callBack(hi);
    }, 2000);
};

const log = (message: string): void => {
    console.log(message)
};

greet(log);