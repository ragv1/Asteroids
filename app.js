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
