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
