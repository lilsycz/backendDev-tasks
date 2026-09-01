enum Color {
    red,
    green,
    blue
};

const showColor = (color:Color) => {
    console.log (`You chose ${color}.`)
}

showColor (Color.red);
