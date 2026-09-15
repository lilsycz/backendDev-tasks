const myPromise = new Promise((resolve, reject) => {
    const success = true;

    if (success) {
        resolve("Resolved operation successfully!");
    } else {
        reject("Resolved operation rejected!");
    }
});

const result1 = async() => {
    try {
        const success = await myPromise;
        console.log (success);
    } catch (error) {
        console.log (error);
    }
}

result1();