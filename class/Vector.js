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
