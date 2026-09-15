const delayedMessage = (message: string, delay: number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(message);
        }, delay);
    });
};

const result2 = async() => {
    try {
        const message = await delayedMessage("Hello!", 2000);
        console.log(message);
    } catch (error) {
        console.log (error);
    }
};

result2();