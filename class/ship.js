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
