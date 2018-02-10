(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./class/ship":3}],2:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Vector = /** @class */ (function () {
    function Vector(x, y) {
        this.x = 0;
        this.y = 0;
        // return the angle of the vector in radians
        this.getDirection = function () {
            return Math.atan2(this.y, this.x);
        };
        // set the direction of the vector in radians
        this.setDirection = function (angle) {
            var magnitude = this.getMagnitude();
            this.x = Math.cos(angle) * magnitude;
            this.y = Math.sin(angle) * magnitude;
        };
        // get the magnitude of the vector
        this.getMagnitude = function () {
            // use pythagoras theorem to work out the magnitude of the vector
            return Math.sqrt(this.x * this.x + this.y * this.y);
        };
        // set the magnitude of the vector
        this.setMagnitude = function (magnitude) {
            var direction = this.getDirection();
            this.x = Math.cos(direction) * magnitude;
            this.y = Math.sin(direction) * magnitude;
        };
        // add two vectors together and return a new one
        this.add = function (v2) {
            return new Vector(this.x + v2.x, this.y + v2.y);
        };
        // add a vector to this one
        this.addTo = function (v2) {
            this.x += v2.x;
            this.y += v2.y;
        };
        // subtract two vectors and reutn a new one
        this.subtract = function (v2) {
            return new Vector(this.x - v2.x, this.y - v2.y);
        };
        // subtract a vector from this one
        this.subtractFrom = function (v2) {
            this.x -= v2.x;
            this.y -= v2.y;
        };
        // multiply this vector by a scalar and return a new one
        this.multiply = function (scalar) {
            return new Vector(this.x * scalar, this.y * scalar);
        };
        // multiply this vector by the scalar
        this.multiplyBy = function (scalar) {
            this.x *= scalar;
            this.y *= scalar;
        };
        // scale this vector by scalar and return a new vector
        this.divide = function (scalar) {
            return new Vector(this.x / scalar, this.y / scalar);
        };
        // scale this vector by scalar
        this.divideBy = function (scalar) {
            this.x /= scalar;
            this.y /= scalar;
        };
        // dot product of two vectors
        this.dotProduct = function (v2) {
            return this.x * v2.x + this.y * v2.y;
        };
        // normalize a given vector
        this.normalize = function () {
            return new Vector(this.x / (Math.sqrt(this.x * this.x + this.y * this.y)), this.y / (Math.sqrt(this.x * this.x + this.y * this.y)));
        };
        // Aliases
        this.getLength = this.getMagnitude;
        this.setLength = this.setMagnitude;
        this.getAngle = this.getDirection;
        this.setAngle = this.setDirection;
        // Utilities
        this.copy = function () {
            return new Vector(this.x || 0, this.y || 0);
        };
        this.toString = function () {
            return 'x: ' + this.x + ', y: ' + this.y;
        };
        this.toArray = function () {
            return [this.x, this.y];
        };
        this.toObject = function () {
            return { x: this.x, y: this.y };
        };
        this.vectorFromAngle = function (angle) {
            return new Vector(Math.cos(angle), Math.sin(angle));
        };
        this.x = x;
        this.y = y;
    }
    return Vector;
}());
exports.Vector = Vector;

},{}],3:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Vector_1 = require("./Vector");
var Ship = /** @class */ (function () {
    function Ship(x, y, ctx) {
        this.name = 'Enterprise-SHIP: Created Sucessfuly'; // debugin purpose
        this.r = 20;
        this.angle = -Math.PI / 2;
        this.ANGLE_VELOCITY = 0;
        this.isMoving = false;
        this.pos = new Vector_1.Vector(x, y);
        this.velocity = new Vector_1.Vector(0, 0);
        this.ctx = ctx;
    }
    Ship.prototype.draw = function () {
        this.ctx.save();
        // save the unrotated context of the canvas so we can restore it later
        this.ctx.translate(this.pos.x, this.pos.y);
        //the rotation
        this.ctx.rotate(this.angle);
        // the triangle
        this.ctx.beginPath();
        this.ctx.moveTo(0, -this.r);
        this.ctx.lineTo(0, this.r);
        this.ctx.lineTo(2 * this.r, 0);
        this.ctx.closePath();
        // the outline
        this.ctx.lineWidth = 10;
        this.ctx.strokeStyle = '#666666';
        // the fill color
        this.ctx.fillStyle = "#FFCC00";
        //the drawing
        this.ctx.stroke();
        this.ctx.fill();
        // we’re done with the rotating so restore the unrotated context
        this.ctx.restore();
    };
    Ship.prototype.update = function () {
        this.pos.addTo(this.velocity);
        if (this.isMoving === true) {
            this.boost();
        }
        //create friction
        this.velocity.multiplyBy(0.99);
    };
    //rotation movement functions
    Ship.prototype.turn = function () {
        this.angle += this.ANGLE_VELOCITY;
        this.velocity.setDirection(this.angle);
    };
    Ship.prototype.rotate = function (ang) {
        this.ANGLE_VELOCITY = ang;
    };
    //linear movement functions
    Ship.prototype.boost = function () {
        var force = new Vector_1.Vector(Math.cos(this.angle), Math.sin(this.angle));
        force.multiplyBy(0.2);
        this.velocity.addTo(force);
    };
    Ship.prototype.move = function (b) {
        this.isMoving = b;
    };
    return Ship;
}());
exports.Ship = Ship;

},{"./Vector":2}]},{},[1]);
