type helloFunction= (message:string) => void;
const greet = (callBack: helloFunction) => {
    callBack(`Hello from callback!`)
};

const log = (message: string): void => {
    console.log(message)
};

greet(log);