enum Color {
    red,
    green,
    blue
};

let color = Color.red;
const showColor = (color:Color) => {
    return `You chose ${color}.`
}

console.log(showColor(color));
