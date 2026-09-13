const checkStock = new Promise((resolve, reject) => {
    console.log("1. This executor function starts immediately!");

    const inStock = false;

    if (inStock) {
        resolve(`Here you go!`);
    } else {
        reject(`Uh-ooh...`);
    }
});

console.log("2. Promise created, continuing with the rest of the script");

checkStock.then((msg)=> {console.log (msg)});
checkStock.catch((error)=> {console.log (error)});

/* "1. This executor function starts immediately! prints down first, it doesn't goes into inStock judgement */