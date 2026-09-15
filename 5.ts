const fetchAdviceById = (id: number) => {
    fetch(`https://api.adviceslip.com/advice/${id}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Fetching did not work");
            }
            return response.json();
        })
        .then((data) => console.log(`Advice ID: ${id}: ${data.slip.advice}`))
        .catch((error) => console.log("Error fetching advice:", error));
};

const result4 = async() =>{
    try {
        const id = 8;
        const response = await fetch(`https://api.adviceslip.com/advice/${id}`);
        const data = await response.json();
        console.log (`Advice ID: ${id}: ${data.slip.advice}`);
    } catch (error) {
        console.log (error);
    }
}

result4();