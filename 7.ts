const flipACoin = () => {
    return new Promise((resolve, reject) => {
        const outcome = Math.random() > 0.5;
        outcome ? resolve("You win!") : reject("You lose!");
        console.log (outcome);
    });
};



const result6 = async() => {
    try {
        const coinResult = await flipACoin();
        console.log(coinResult);
        const response = await fetch("https://api.adviceslip.com/advice");
        const data = await response.json();
        console.log(data.slip.advice);
    } catch (error) {
        console.log(error, "No advice for you.");
    }
};

result6();