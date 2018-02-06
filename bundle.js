(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var shapes_1 = require("./class/shapes");
console.log(shapes_1.name);
function turn(e) {
    var code = e.keyCode;
    switch (code) {
        case 37:
            console.log("Left");
            break; //Left key
        case 38:
            console.log("Up");
            break; //Up key
        case 39:
            console.log("Right");
            break; //Right key
        case 40:
            console.log("Down");
            break; //Down key
        default: console.log(code); //Everything else
    }
}

},{"./class/shapes":2}],2:[function(require,module,exports){
"use strict";
exports.name = "miguel";

},{}]},{},[1]);
