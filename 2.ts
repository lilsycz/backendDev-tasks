// type helloMessage= (message:string) => void;


// const delayedGreeting = (message: string): void => {
//     setTimeout(() => {
//         const Hi = `Hi, I'm late!`;
//         console.log ()
//     }, 2000);
// };

// const sayHelloLater = () => {
//     delayedGreeting(Hi);
// };

type helloMessage= (message:string) => void;


const sayHelloLater = (A: helloMessage): void => {
    setTimeout(() => {
        const Hi = `Hi, I'm late!`;
        A(Hi);
    }, 2000);
};

const printHello: helloMessage = (message: string) => {
    console.log(message);
};

sayHelloLater(printHello);
