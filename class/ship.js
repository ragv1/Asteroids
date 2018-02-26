"use strict";
exports.__esModule = true;
var Vector_1 = require("./Vector");
var Laser_1 = require("./Laser");
var Ship = /** @class */ (function () {
    function Ship(width, height, ctx, arr) {
        var _this = this;
        this.name = 'Enterprise-SHIP: Created Sucessfuly'; // debugin purpose
        this.r = 10;
        this.angle = -Math.PI / 2;
        this.ANGLE_VELOCITY = 0;
        this.isMoving = false;
        this.laserArr = [];
        this.unableShip = false;
        this.FAKE_POS = { x: -2000, y: -2000 };
        this.invencible = false;
        this.isShooting = false;
        this.internalClock = 0;
        this.keyUpControls = function (e) {
            e.preventDefault();
            var code = e.keyCode;
            switch (code) {
                case 37:
                    _this.rotate(0);
                    break; //Left key
                case 65:
                    _this.rotate(0);
                    break; //the 'a' key
                case 38:
                    _this.move(false);
                    break; //Up key
                case 87:
                    _this.move(false);
                    break; //Up key
                case 39:
                    _this.rotate(0);
                    break; //Right key
                case 68:
                    _this.rotate(0);
                    break; // the 'w' key
                case 32:
                    _this.shoot(_this.laserArr);
                    break; //spacebar
                case 13:
                    _this.shoot(_this.laserArr);
                    break; //spacebar
                case 90:
                    _this.fire(false);
                    break; // the 'z' key
                default: console.log(code); //Everything else
            }
        };
        this.keydownControls = function (e) {
            e.preventDefault();
            var code = e.keyCode;
            switch (code) {
                case 37:
                    _this.rotate(-0.05);
                    ;
                    break; //Left key
                case 65:
                    _this.rotate(-0.05);
                    break; //the 'a' key
                case 38:
                    _this.move(true);
                    break; //Up key
                case 87:
                    _this.move(true);
                    break; //Up key
                case 39:
                    _this.rotate(0.05);
                    break; //Right key
                case 68:
                    _this.rotate(0.05);
                    break; // the 'w' key
                case 90:
                    _this.fire(true);
                    break; // the 'z' key
                default: console.log(code); //Everything else
            }
        };
        this.worldWidth = width;
        this.worldHeight = height;
        this.pos = new Vector_1.Vector(width / 2, height / 2);
        this.fakePos = this.pos;
        this.velocity = new Vector_1.Vector(0, 0);
        this.ctx = ctx;
        this.laserArr = arr;
    }
    Ship.prototype.draw = function () {
        // save the unrotated context of the canvas so we can restore it later
        this.ctx.save();
        // translate the axis to this position
        this.ctx.translate(this.pos.x, this.pos.y);
        //the rotation
        this.ctx.rotate(this.angle);
        // the triangle                       
        this.ctx.beginPath();
        this.ctx.moveTo(-this.r, this.r);
        this.ctx.lineTo(-this.r / 2, 0);
        this.ctx.lineTo(-this.r, -this.r);
        this.ctx.lineTo(this.r, 0);
        this.ctx.closePath();
        // the outline
        this.ctx.lineWidth = 10;
        this.ctx.strokeStyle = '#666666';
        // the fill color
        this.ctx.fillStyle = this.invencible ? '' : '#FFCC00';
        // this.ctx.fillStyle = "#FFCC00";
        //the drawing
        this.ctx.stroke();
        this.ctx.fill();
        //the impact zone
        this.ctx.beginPath();
        this.ctx.arc(0, 0, this.r + 10, 0, 2 * Math.PI);
        // the outline
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = this.invencible ? '#ff0000' : '#666666';
        this.ctx.closePath();
        this.ctx.stroke();
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
        if (this.isShooting === true) {
            this.shoot(this.laserArr);
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
    Ship.prototype.reset = function () {
        this.pos.x = this.worldWidth / 2;
        this.pos.y = this.worldHeight / 2;
        this.velocity = new Vector_1.Vector(0, 0);
        this.angle = -Math.PI / 2;
        this.move(false);
        this.fire(false);
        this.disableShip(5000 /*disable for 5 seconds*/);
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
        this.internalClock++;
        if (this.internalClock % 11 == 0) {
            arr.push(new Laser_1.Laser(this.worldWidth, this.worldHeight, this.ctx, this.pos, this.angle, this.r));
        }
    };
    Ship.prototype.fire = function (b) {
        this.isShooting = b;
    };
    Ship.prototype.disableShip = function (timeMs) {
        var _this = this;
        setTimeout(function () {
            _this.fakePos = _this.pos;
            _this.invencible = false;
        }, timeMs);
        this.fakePos = this.FAKE_POS;
        this.invencible = true;
    };
    return Ship;
}()); //END SHIP CLASS
exports.Ship = Ship;
