"use strict";
exports.__esModule = true;
var ship_1 = require("./class/ship");
var width;
var height;
var ctx;
var canvas;
var ship;
function createElements() {
    canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'cnvs');
    document.getElementsByTagName('body')[0].appendChild(canvas);
}
function setCanvasSize() {
    canvas.width = window.innerWidth - 30;
    canvas.height = window.innerHeight - 30;
    width = canvas.width;
    height = canvas.height;
}
function attachEventListeners() {
    window.addEventListener("resize", function () {
        setCanvasSize();
    });
    canvas = document.getElementById('cnvs');
    canvas.tabIndex = 1;
    canvas.addEventListener("keydown", keydownControls);
    canvas.addEventListener("keyup", keyUpControls);
    //  console.log(canvas );
}
function createShip() {
    ship = new ship_1.Ship(width / 2, height / 2, ctx);
    // ship.pos.setDirection(-Math.PI/2);
    console.log(ship.name);
}
function keydownControls(e) {
    var code = e.keyCode;
    switch (code) {
        case 37:
            console.log("Left");
            ship.rotate(-0.1);
            ;
            break; //Left key
        case 38:
            console.log("Up");
            ship.move(true);
            break; //Up key
        case 39:
            console.log("Right");
            ship.rotate(0.1);
            break; //Right key
        case 40:
            console.log("Down");
            break; //Down key
        default: console.log(code); //Everything else
    }
}
function keyUpControls(e) {
    var code = e.keyCode;
    switch (code) {
        case 37:
            console.log("Left");
            ship.rotate(0);
            break; //Left key
        case 38:
            console.log("Up leaving");
            ship.move(false);
            break; //Up key
        case 39:
            console.log("Right");
            ship.rotate(0);
            break; //Right key
        case 40:
            console.log("Down");
            break; //Down key
        default: console.log(code); //Everything else
    }
}
// THE GAME
function gameLoop() {
    requestAnimationFrame(gameLoop);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    ship.draw();
    ship.update();
    ship.turn();
}
//Preload necesary stuff for the game
window.onload = function () {
    createElements();
    setCanvasSize();
    attachEventListeners();
    canvas = document.getElementById('cnvs');
    ctx = canvas.getContext("2d");
    createShip();
    gameLoop();
};
