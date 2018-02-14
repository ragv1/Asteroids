"use strict";
exports.__esModule = true;
var Score = /** @class */ (function () {
    function Score(fontSize, fontType, color, worldWidth, worldHeight, ctx) {
        this.score = 0;
        this.lives = 5;
        this.unableScore = false;
        this.level = 0;
        this.fontSize = fontSize;
        this.fontType = fontType;
        this.worldWidth = worldWidth;
        this.worldHeight = worldHeight;
        this.ctx = ctx;
        this.score = 0;
        this.color = color;
    }
    Score.prototype.draw = function () {
        this.ctx.font = this.fontSize + " " + this.fontType;
        this.ctx.fillStyle = this.color;
        this.ctx.fillText('Puntos: ' + this.score + '\nVidas: ' + this.lives, this.worldWidth * 0.1, this.worldHeight * 0.1);
        this.ctx.fillText('Nivel: ' + this.level, this.worldWidth * 0.1, this.worldHeight * 0.2);
    };
    Score.prototype.update = function () {
        this.draw();
    };
    Score.prototype.increment = function () {
        if (this.unableScore) {
            return;
        }
        this.score++;
    };
    Score.prototype.incrementLevel = function () {
        this.level++;
    };
    Score.prototype.reduce = function () {
        this.lives--;
    };
    Score.prototype.disableScore = function () {
        this.unableScore = true;
    };
    return Score;
}());
exports.Score = Score;
