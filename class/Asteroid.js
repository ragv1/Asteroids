"use strict";
exports.__esModule = true;
var Vector_1 = require("./Vector");
var Asteroid = /** @class */ (function () {
    function Asteroid(width, height, ctx, r, x, y) {
        this.name = 'Enterprise-SHIP: Created Sucessfuly'; // debugin purpose
        this.r = 15 + Math.random() * 30;
        this.shootPrecision = 10;
        //array of radius
        this.arrR = [];
        this.angle = 0;
        this.ANGLE_VELOCITY = 0.05 - Math.random() * 0.1;
        this.isMoving = false;
        this.magnitude = 1 + (Math.random() * 1);
        this.sides = 6 + Math.floor((Math.random() * 11));
        this.asteroidOffset = 30;
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
        return d <= this.r + this.shootPrecision;
    };
    Asteroid.prototype.distance = function (v1, v2) {
        return Math.sqrt(Math.pow((v1.x - v2.x), 2) + Math.pow((v1.y - v2.y), 2));
    };
    Asteroid.prototype.hit = function (shipPos, shipR) {
        var d = this.distance(shipPos, this.pos);
        return d <= this.r - shipR + this.asteroidOffset;
    };
    Asteroid.prototype.resetPos = function () {
        this.pos.x = -30 - Math.random() * 30;
        this.pos.y = -30 - Math.random() * 30;
    };
    return Asteroid;
}());
exports.Asteroid = Asteroid;
