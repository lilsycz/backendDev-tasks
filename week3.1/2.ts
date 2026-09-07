type helloMessage= (message:string) => void;
const Hi= (greeting: helloMessage) => {
    greeting(`Hi, I'm late!`)
};

const delayedGreeting = (message: string): void => {
    console.log(message)
};

const sayHelloLater = () => {
    Hi(delayedGreeting);
};

setTimeout(sayHelloLater, 2000);