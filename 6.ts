type Message = (message: string) => void;

const multiMessages = (a: Message) => {
    a("I'm Hsuan");
    a("I'm 26");
    a("I'm a student");
};

const message = (message:string) => {
    console.log(message);
};

multiMessages(message);