type IDType = number | string;
let ID=12345
const showID = (ID:IDType) => {
    return `Your ID is: ${ID}.`
};

console.log (showID(ID));