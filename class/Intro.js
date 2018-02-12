"use strict";
exports.__esModule = true;
var Screen = /** @class */ (function () {
    function Screen(fontSize, color, x, y, ctx, message) {
        this.fontSize = fontSize;
        this.fontType = 'Consolas';
        this.xpos = x;
        this.ypos = y;
        this.ctx = ctx;
        this.color = color;
        this.message = message;
    }
    Screen.prototype.draw = function () {
        this.ctx.font = this.fontSize + " " + this.fontType;
        this.ctx.fillStyle = this.color;
        this.ctx.fillText(this.message, this.xpos, this.ypos);
    };
    return Screen;
}());
exports.Screen = Screen;
