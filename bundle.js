(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var ship_1 = require("./class/ship");
var Asteroid_1 = require("./class/Asteroid");
var width;
var height;
var ctx;
var canvas;
var ship;
var asteroids = [];
var laser = [];
function createCanvas() {
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
        ship.setPosition(width, height);
    });
    canvas = document.getElementById('cnvs');
    canvas.tabIndex = 1;
    canvas.addEventListener("keydown", ship.keydownControls);
    canvas.addEventListener("keyup", ship.keyUpControls);
    //  console.log(canvas );
}
function createShip() {
    ship = new ship_1.Ship(width, height, ctx, laser);
    console.log(ship.name);
}
function createAsteroids(num) {
    num = num ? num : 10;
    for (var i = 0; i < num; i++) {
        asteroids.push(new Asteroid_1.Asteroid(width, height, ctx));
    }
    console.log('Asteroids Created Sucessfuly: ', num);
}
// THE GAME
function gameLoop() {
    requestAnimationFrame(gameLoop);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    // Asteroids Drawing loop
    for (var i = 0; i < asteroids.length; i++) {
        asteroids[i].draw();
        asteroids[i].update();
        if (asteroids[i].hit(ship.pos)) {
            // TODO: delete one live
            console.log('minus one live');
        }
    }
    //lasers drawing loop
    for (var i = laser.length - 1; i >= 0; i--) {
        laser[i].draw();
        laser[i].update();
        for (var j = asteroids.length - 1; j >= 0; j--) {
            if (asteroids[j]["break"](laser[i])) {
                var pos = asteroids[j].pos;
                var r = asteroids[j].r;
                asteroids.splice(j, 1);
                laser.splice(i, 1);
                asteroids.push(new Asteroid_1.Asteroid(width, height, ctx, r * 0.50, pos.x, pos.y));
                asteroids.push(new Asteroid_1.Asteroid(width, height, ctx, r * 0.50, pos.x, pos.y));
                break;
            }
            else if (laser[i].outSide()) {
                laser.splice(i, 1);
                break;
            }
            else if (asteroids[j].r <= 5) {
                asteroids.splice(j, 1);
                break;
            }
        }
    }
    ship.draw();
    ship.update();
    ship.turn();
}
//Preload necesary stuff for the game
window.onload = function () {
    createCanvas();
    setCanvasSize();
    canvas = document.getElementById('cnvs');
    ctx = canvas.getContext("2d");
    createShip();
    attachEventListeners();
    createAsteroids(5);
    gameLoop();
};

},{"./class/Asteroid":2,"./class/ship":5}],2:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Vector_1 = require("./Vector");
var Asteroid = /** @class */ (function () {
    function Asteroid(width, height, ctx, r, x, y) {
        this.name = 'Enterprise-SHIP: Created Sucessfuly'; // debugin purpose
        this.r = 15 + Math.random() * 30;
        //array of radius
        this.arrR = [];
        this.angle = 0;
        this.ANGLE_VELOCITY = 0.05 - Math.random() * 0.1;
        this.isMoving = false;
        this.magnitude = 1 + (Math.random() * 1);
        this.sides = 6 + Math.floor((Math.random() * 11));
        this.worldWidth = width;
        this.worldHeight = height;
        var angle = Math.PI * 2 * Math.random();
        this.pos = new Vector_1.Vector(Math.random() * width, Math.random() * height);
        //if x or y  exists asign that else use the random value
        this.pos.x = x ? x : this.pos.x;
        this.pos.y = y ? y : this.pos.y;
        this.velocity = new Vector_1.Vector(Math.cos(angle), Math.sin(angle));
        this.velocity.multiplyBy(this.magnitude);
        this.ctx = ctx;
        this.r = r ? r : this.r;
        //array of random radius
        for (var i = 0; i < this.sides; i++) {
            this.arrR[i] = this.r + (-this.r / 1.8 + Math.random() * 1.5 * this.r);
        }
    }
    Asteroid.prototype.draw = function () {
        this.ctx.save();
        // save the unrotated context of the canvas so we can restore it later
        this.ctx.translate(this.pos.x, this.pos.y);
        //the rotation
        this.ctx.rotate(this.angle);
        // the figure
        this.polygon(this.ctx, 0, 0, this.arrR, this.sides);
        // the outline
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = '#fff';
        // the fill color
        // this.ctx.fillStyle = "#FFCC00";
        //the drawing
        this.ctx.stroke();
        // this.ctx.fill();
        // we’re done with the rotating so restore the unrotated context
        this.ctx.restore();
    };
    Asteroid.prototype.update = function () {
        this.pos.addTo(this.velocity);
        this.angle += this.ANGLE_VELOCITY;
        if (this.pos.x > this.worldWidth + this.r) {
            this.pos.x = -this.r;
        }
        else if (this.pos.x < -this.r) {
            this.pos.x = this.worldWidth + this.r;
        }
        else if (this.pos.y > this.worldHeight + this.r) {
            this.pos.y = -this.r;
        }
        else if (this.pos.y < -this.r) {
            this.pos.y = this.worldHeight + this.r;
        }
    };
    Asteroid.prototype.polygon = function (ctx, x, y, r, sides) {
        if (sides < 3)
            return;
        var a = ((Math.PI * 2) / sides);
        ctx.beginPath();
        ;
        ctx.translate(x, y);
        ctx.moveTo(r[0], 0);
        for (var i = 1; i < sides; i++) {
            ctx.lineTo(r[i] * Math.cos(a * i), r[i] * Math.sin(a * i));
        }
        ctx.closePath();
    };
    Asteroid.prototype["break"] = function (laser) {
        var d = this.distance(laser.pos, this.pos);
        return d <= this.r;
    };
    Asteroid.prototype.distance = function (v1, v2) {
        return Math.sqrt(Math.pow((v1.x - v2.x), 2) + Math.pow((v1.y - v2.y), 2));
    };
    Asteroid.prototype.hit = function (shipPos) {
        var d = this.distance(shipPos, this.pos);
        return d <= this.r + 30;
    };
    return Asteroid;
}());
exports.Asteroid = Asteroid;

},{"./Vector":4}],3:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Vector_1 = require("./Vector");
var Laser = /** @class */ (function () {
    function Laser(width, height, ctx, shipPos, angle, offset) {
        this.angle = -Math.PI / 2;
        this.offset = 0;
        this.worldWidth = width;
        this.worldHeight = height;
        this.pos = new Vector_1.Vector(shipPos.x, shipPos.y);
        this.velocity = new Vector_1.Vector(Math.cos(angle), Math.sin(angle));
        this.velocity.multiplyBy(10);
        this.ctx = ctx;
        this.offset = offset;
    }
    Laser.prototype.draw = function () {
        // save the unrotated context of the canvas so we can restore it later
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.translate(this.pos.x, this.pos.y);
        // the circles
        this.ctx.arc(0, 0, 2, 0, 2 * Math.PI);
        this.ctx.closePath();
        // the outline
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = '#fff';
        // the fill color
        this.ctx.fillStyle = "#fff";
        //the drawing
        this.ctx.stroke();
        this.ctx.fill();
        // we’re done with the rotating so restore the unrotated context
        this.ctx.restore();
    };
    Laser.prototype.update = function () {
        this.pos.addTo(this.velocity);
    };
    Laser.prototype.outSide = function () {
        if (this.pos.x > this.worldWidth || this.pos.y > this.worldHeight || this.pos.x < 0 || this.pos.y < 0) {
            return true;
        }
        else {
            return false;
        }
    };
    return Laser;
}());
exports.Laser = Laser;

},{"./Vector":4}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Vector_1 = require("./Vector");
var Laser_1 = require("./Laser");
var Ship = /** @class */ (function () {
    function Ship(width, height, ctx, arr) {
        var _this = this;
        this.name = 'Enterprise-SHIP: Created Sucessfuly'; // debugin purpose
        this.r = 40;
        this.angle = -Math.PI / 2;
        this.ANGLE_VELOCITY = 0;
        this.isMoving = false;
        this.laserArr = [];
        this.keyUpControls = function (e) {
            var code = e.keyCode;
            switch (code) {
                case 37:
                    _this.rotate(0);
                    break; //Left key
                case 38:
                    _this.move(false);
                    break; //Up key
                case 39:
                    _this.rotate(0);
                    break; //Right key
                default: console.log(code); //Everything else
            }
        };
        this.keydownControls = function (e) {
            var code = e.keyCode;
            switch (code) {
                case 37:
                    _this.rotate(-0.05);
                    ;
                    break; //Left key
                case 38:
                    _this.move(true);
                    break; //Up key
                case 39:
                    _this.rotate(0.05);
                    break; //Right key
                case 32:
                    _this.shoot(_this.laserArr);
                    break;
                default: console.log(code); //Everything else
            }
        };
        this.worldWidth = width;
        this.worldHeight = height;
        this.pos = new Vector_1.Vector(width / 2, height / 2);
        this.velocity = new Vector_1.Vector(0, 0);
        this.ctx = ctx;
        this.laserArr = arr;
    }
    Ship.prototype.draw = function () {
        this.ctx.save();
        // save the unrotated context of the canvas so we can restore it later
        this.ctx.translate(this.pos.x, this.pos.y);
        //the rotation
        this.ctx.rotate(this.angle);
        // the triangle                      TODO: DRAW THE SHIP WITH ORIGIN IN THE MIDDLE  
        this.ctx.beginPath();
        this.ctx.moveTo(0, -this.r / 2);
        this.ctx.lineTo(0, this.r / 2);
        this.ctx.lineTo(this.r, 0);
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
        if (this.pos.x > this.worldWidth + this.r + 30) {
            this.pos.x = -this.r - 20;
        }
        else if (this.pos.x < -this.r - 30) {
            this.pos.x = this.worldWidth + this.r + 20;
        }
        else if (this.pos.y > this.worldHeight + this.r + 30) {
            this.pos.y = -this.r - 20;
        }
        else if (this.pos.y < -this.r - 30) {
            this.pos.y = this.worldHeight + this.r + 20;
        }
        if (this.isMoving === true) {
            this.boost();
        }
        //inherent ship friction
        this.velocity.multiplyBy(0.99);
    };
    Ship.prototype.setPosition = function (newWidth, newHeight) {
        this.pos.x -= (this.worldWidth - newWidth);
        this.pos.y -= (this.worldHeight - newHeight);
        this.worldWidth = newWidth;
        this.worldHeight = newHeight;
    };
    //rotation movement functions
    Ship.prototype.turn = function () {
        this.angle += this.ANGLE_VELOCITY;
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
    Ship.prototype.shoot = function (arr) {
        arr.push(new Laser_1.Laser(this.worldWidth, this.worldHeight, this.ctx, this.pos, this.angle, this.r));
    };
    return Ship;
}());
exports.Ship = Ship;

},{"./Laser":3,"./Vector":4}]},{},[1]);
