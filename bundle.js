(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var ship_1 = require("./class/ship");
var Asteroid_1 = require("./class/Asteroid");
var Score_1 = require("./class/Score");
var Intro_1 = require("./class/Intro");
var background_1 = require("./class/background");
var Tokens_1 = require("./class/Tokens");
var width;
var height;
var ctx;
var canvas;
var ship;
var asteroids = [];
var laser = [];
var score;
var counter = 0;
var introScreen;
var idAnimation;
var idGameLoop;
var idGameOver;
var paused = false;
var info;
var info2;
var info3;
var endScreen;
var endInfo;
var level = 0;
var frame = 0;
var background;
var shieldToken;
var togglePause;
function createBackground(context, width, height, starts) {
    var bg = new background_1.Background(context, width, height, starts);
    background = bg.draw();
}
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
    canvas.addEventListener("click", startGame);
    //  console.log(canvas );
}
function createShip() {
    ship = new ship_1.Ship(width, height, ctx, laser);
    console.log(ship.name);
}
function createAsteroids(num) {
    // num= num? num:10;
    for (var i = 0; i < num; i++) {
        asteroids.push(new Asteroid_1.Asteroid(width, height, ctx));
    }
    console.log('Asteroids Created Sucessfuly: ', num);
}
function createScore(fontSize, fontType, color, width, height, ctx) {
    score = new Score_1.Score(fontSize, fontType, color, width, height, ctx);
}
function endGame() {
    cancelAnimationFrame(idGameLoop);
    canvas.removeEventListener("keydown", ship.keydownControls);
    canvas.removeEventListener("keyup", ship.keyUpControls);
    canvas.removeEventListener("click", startGame);
    canvas.removeEventListener("keydown", togglePause);
    paused = false;
    score.disableScore();
    ship.reset();
    canvas.addEventListener("click", restartGame);
    gameOver();
    return true;
}
function restartGame() {
    loadGame(false);
}
function gameOver() {
    // idGameOver= requestAnimationFrame(gameOver);
    endScreen.draw();
    endInfo.draw();
}
function startGame() {
    canvas.removeEventListener("click", startGame);
    cancelAnimationFrame(idAnimation);
    canvas.addEventListener('keydown', togglePause); // this has to be added here because this method call gameLoop() directly and can not be called any where else
    gameLoop();
}
togglePause = function (e) {
    var key = e.keyCode;
    if (key === 80) {
        if (!paused) {
            paused = true;
        }
        else if (paused) {
            paused = false;
            gameLoop();
        }
    }
};
function gameIntro() {
    idAnimation = requestAnimationFrame(gameIntro);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    for (var i = 0; i < asteroids.length; i++) {
        asteroids[i].draw();
        asteroids[i].update();
    }
    introScreen.draw();
    info.draw();
    info2.draw();
    info3.draw();
}
function loadGame(newGame) {
    if (newGame) {
        createCanvas();
    }
    if (!newGame) {
        cancelAnimationFrame(idGameLoop);
        canvas.removeEventListener("click", restartGame);
        canvas.removeEventListener("keydown", togglePause);
        asteroids = [];
        laser = [];
    }
    setCanvasSize();
    canvas = document.getElementById('cnvs');
    ctx = canvas.getContext("2d");
    createBackground(ctx, width, height);
    createShip();
    createAsteroids(5);
    createScore('30px', 'Consolas', 'white', width, height, ctx);
    introScreen = new Intro_1.Screen('40px', 'red', width / 6, height / 3, ctx, 'Click en la pantalla para empezar');
    info = new Intro_1.Screen('30px', 'white', width / 6, height / 2, ctx, 'Use las flechas para Moverse');
    info2 = new Intro_1.Screen('30px', 'white', width / 6, height / 1.8, ctx, 'Use la tecla de Espacio para disparar');
    info3 = new Intro_1.Screen('30px', 'white', width / 6, height / 1.65, ctx, 'Use la tecla P para Pausar');
    endScreen = new Intro_1.Screen('40px', 'red', width / 6, height / 3, ctx, 'Game Over');
    endInfo = new Intro_1.Screen('30px', 'yellow', width / 6, height / 2.6, ctx, 'Click to Restart');
    shieldToken = new Tokens_1.Token('E', width, height, ctx, 'green');
    gameIntro();
    attachEventListeners();
}
function levelUp() {
    if (score.lives <= 100) {
        score.lives++;
    }
    createAsteroids(score.level + 5);
    score.incrementLevel();
}
function pausedScreen() {
    ctx.font = "60px Consolas";
    ctx.fillStyle = "orange";
    ctx.fillText('Pausa', (width - 160) / 2, height / 2);
}
// THE GAME
function gameLoop() {
    // Draw the background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(background, 0, 0);
    //Chek for lives
    if (score.lives <= 0) {
        endGame();
    }
    //Asteroids drawing, breaking loop
    for (var i = asteroids.length - 1; i >= 0; i--) {
        if (asteroids[i].r <= 5) {
            asteroids.splice(i, 1);
            continue;
        }
        asteroids[i].draw();
        asteroids[i].update();
        if (asteroids[i].hit(ship.fakePos, ship.r)) {
            if (score.lives <= 0) {
                endGame();
            }
            else {
                var copyAsteroid = asteroids[i];
                copyAsteroid.resetPos();
                asteroids.splice(i, 1);
                ship.reset();
                asteroids.push(copyAsteroid);
                score.reduce();
            }
        }
    }
    //Check if the level is completed
    if (asteroids.length < 1) {
        levelUp();
        ship.reset();
    }
    //lasers drawing loop, increase score
    for (var i = laser.length - 1; i >= 0; i--) {
        laser[i].draw();
        laser[i].update();
        for (var j = asteroids.length - 1; j >= 0; j--) {
            if (asteroids[j]["break"](laser[i])) {
                score.increment();
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
        }
    }
    // Ship drawing
    ship.draw();
    ship.update();
    ship.turn();
    //Drawing the token
    shieldToken.draw();
    shieldToken.update();
    // Score Drawing and updating counter
    score.update();
    if (paused) {
        pausedScreen(); //SHOW THE PAUSED SCREEN
    }
    else {
        idGameLoop = requestAnimationFrame(gameLoop);
    }
}
//Preload necesary stuff for the game
window.onload = function () {
    loadGame(true);
};

},{"./class/Asteroid":2,"./class/Intro":3,"./class/Score":5,"./class/Tokens":6,"./class/background":8,"./class/ship":9}],2:[function(require,module,exports){
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

},{"./Vector":7}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{"./Vector":7}],5:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Score = /** @class */ (function () {
    function Score(fontSize, fontType, color, worldWidth, worldHeight, ctx) {
        this.score = 0;
        this.lives = 5;
        this.unableScore = false;
        this.level = 1;
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

},{}],6:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Vector_1 = require("./Vector");
var Token = /** @class */ (function () {
    function Token(tokenName, width, height, ctx, color, r, x, y) {
        this.name = 'Token created sucessfully'; // debugin purpose
        this.r = 30;
        this.shootPrecision = 10;
        //array of radius
        this.arrR = [];
        this.angle = 0;
        this.ANGLE_VELOCITY = 0.05 - Math.random() * 0.1;
        this.isMoving = false;
        this.magnitude = 1 + (Math.random() * 1);
        this.fontSize = '20';
        this.fontType = 'Consolas';
        this.tokenName = tokenName;
        this.color = color;
        this.worldWidth = width;
        this.worldHeight = height;
        var angle = Math.PI * 2 * Math.random();
        this.pos = new Vector_1.Vector(Math.random() * width, Math.random() * height);
        //if x or y  exists asign that else use the random value
        this.r = r ? r : this.r;
        this.pos.x = x ? x : this.pos.x;
        this.pos.y = y ? y : this.pos.y;
        this.velocity = new Vector_1.Vector(Math.cos(angle), Math.sin(angle));
        this.velocity.multiplyBy(this.magnitude);
        this.ctx = ctx;
    }
    Token.prototype.draw = function () {
        this.ctx.save();
        // save the unrotated context of the canvas so we can restore it later
        this.ctx.translate(this.pos.x, this.pos.y);
        //the rotation
        this.ctx.rotate(this.angle);
        // the outline
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = this.color;
        // the circle
        this.ctx.beginPath();
        this.ctx.arc(0, 0, this.r, 0, 2 * Math.PI);
        this.ctx.stroke();
        // the fill color
        this.ctx.fillStyle = this.color;
        //the drawing
        this.ctx.stroke();
        this.ctx.fill();
        //Draw the text
        this.ctx.font = this.fontSize + " " + this.fontType;
        this.ctx.fillStyle = '#fff';
        this.ctx.fillText(this.tokenName, -10, 10);
        // we’re done with the rotating so restore the unrotated context
        this.ctx.restore();
    };
    Token.prototype.update = function () {
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
    Token.prototype.polygon = function (ctx, x, y, r, sides) {
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
    Token.prototype["break"] = function (laser) {
        var d = this.distance(laser.pos, this.pos);
        return d <= this.r + this.shootPrecision;
    };
    Token.prototype.distance = function (v1, v2) {
        return Math.sqrt(Math.pow((v1.x - v2.x), 2) + Math.pow((v1.y - v2.y), 2));
    };
    Token.prototype.resetPos = function () {
        this.pos.x = -30 - Math.random() * 30;
        this.pos.y = -30 - Math.random() * 30;
    };
    return Token;
}());
exports.Token = Token;

},{"./Vector":7}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{"./Laser":4,"./Vector":7}]},{},[1]);
