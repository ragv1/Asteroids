"use strict";
var shapes_1 = require("./class/shapes");
console.log(shapes_1.name);
function turn(e) {
    var code = e.keyCode;
    switch (code) {
        case 37:
            console.log("Left");
            break; //Left key
        case 38:
            console.log("Up");
            break; //Up key
        case 39:
            console.log("Right");
            break; //Right key
        case 40:
            console.log("Down");
            break; //Down key
        default: console.log(code); //Everything else
    }
}
