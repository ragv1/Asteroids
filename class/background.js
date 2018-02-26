"use strict";
exports.__esModule = true;
var Background = /** @class */ (function () {
    function Background(context, width, height, stars) {
        this.stars = 500;
        this.colorrange = [0, 60, 240];
        this.context = context;
        this.width = width;
        this.height = height;
        this.stars = stars ? stars : this.stars;
    }
    Background.prototype.draw = function () {
        var buffer = document.createElement('canvas');
        buffer.width = this.width;
        buffer.height = this.height;
        var context = buffer.getContext('2d');
        for (var i = 0; i < this.stars; i++) {
            var x = Math.random() * this.width;
            var y = Math.random() * this.height;
            var radius = Math.random() * 1.2;
            var hue = this.colorrange[this.getRandom(0, this.colorrange.length - 1)];
            var sat = this.getRandom(50, 100);
            context.beginPath();
            context.arc(x, y, radius, 0, 360);
            context.fillStyle = "hsl(" + hue + ", " + sat + "%, 88%)";
            context.fill();
        }
        return buffer;
    };
    Background.prototype.getRandom = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    return Background;
}());
exports.Background = Background;
