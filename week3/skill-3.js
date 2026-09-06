"use strict";
var Color;
(function (Color) {
    Color[Color["red"] = 0] = "red";
    Color[Color["green"] = 1] = "green";
    Color[Color["blue"] = 2] = "blue";
})(Color || (Color = {}));
;
let color = 0;
const showColor = (color) => {
    return `You chose ${color}.`;
};
console.log(showColor(color));
