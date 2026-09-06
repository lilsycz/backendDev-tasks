type helloFunction= (message:string) => void;
const greet = (greeting: helloFunction) => {
    greeting(`Hello from callback!`)
};

const log = (message: string): void => {
    console.log(message)
};

greet(log);