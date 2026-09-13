type msg = (message:string) => void;

const upperCase = (A:msg): void => {
    const text = `I'm here!`;
    A(text);
};

const convertedText: msg = (message: string) => {
    console.log(message.toUpperCase());
}

upperCase(convertedText);