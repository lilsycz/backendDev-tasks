const fetch2AdviceById = (id1: number, id2:number) => {
    fetch(`https://api.adviceslip.com/advice/${id}`)
        .then((response) => response.json())
        .then((data) => console.log(`Advice ID: ${id1}: ${data.slip.advice}, Advice ID: ${id2}: ${data.slip.advice}`))
        .catch((error) => console.log("Error fetching advice:", error));
};

const result5 = async () =>{
    try {
        const id1=6, id2=199;
        const response1 = await fetch(`https://api.adviceslip.com/advice/${id1}`);
        const data1 = await response1.json();
        const response2 = await fetch(`https://api.adviceslip.com/advice/${id2}`);
        const data2 = await response2.json();
        console.log (`Advice ID: ${id1}: ${data1.slip.advice} Advice ID: ${id2}: ${data2.slip.advice}`);
    } catch (error) {
        console.log (error);
    }
};

result5();