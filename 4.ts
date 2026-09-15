const fetchAdvice = () => {
    fetch("https://api.adviceslip.com/advice")
        .then((response) => response.json())
        .then((data) => console.log(data.slip.advice))
        .catch((error) => console.log("Error fetching advice:", error));
};

const result3 = async() => {
    try {
        const response = await fetch("https://api.adviceslip.com/advice");
        const data = await response.json();
        console.log(data.slip.advice);
    } catch (error) {
        console.log(error);
    }
};

result3();