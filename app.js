//Helper logic
class cPoint {
    constructor(x = 0, y = 0) {
        this.x = 0;
        this.y = 0;
        this.x = x;
        this.y = y;
    }
}
/**
 * Asteroid Class
 */
class cAsteroid {
    constructor(x = undefined, y = undefined, size = undefined, color = "white", line_width = 2) {
        this.x = 0;
        this.y = 0;
        this.velocityX = 0;
        this.velocityY = 0;
        this.lineWidth = 5;
        this.color = "white";
        this.size = 20;
        this.rotation = 0;
        this.rotationSpeed = 0;
        this.pointList = new Array();
        this.draw = () => {
            this.x += this.velocityX;
            this.y += this.velocityY;
            if (this.x < -this.size * 2) {
                this.x = width + this.size * 2;
            }
            else if (this.x > width + this.size * 2) {
                this.x = -2 * this.size;
            }
            if (this.y < -this.size * 2) {
                this.y = height + this.size * 2;
            }
            else if (this.y > height + this.size * 2) {
                this.y = -2 * this.size;
            }
            this.rotation += this.rotationSpeed;
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.beginPath();
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.lineWidth;
            ctx.moveTo(this.pointList[this.pointList.length - 1].x, this.pointList[this.pointList.length - 1].y);
            for (var i = 0; i < this.pointList.length; i++) {
                ctx.lineTo(this.pointList[i].x, this.pointList[i].y);
            }
            ctx.closePath();
            ctx.stroke();
            ctx.restore();
        };
        if (x == undefined) {
            this.x = Math.round(Math.random() * width);
        }
        else {
            this.x = x;
        }
        if (y == undefined) {
            this.y = Math.round(Math.random() * height);
        }
        else {
            this.y = y;
        }
        if (size == undefined) {
            this.size = Math.ceil(Math.random() * 10) + 4;
        }
        else {
            this.size = size;
        }
        this.velocityX = Math.round(Math.random() * 4 - 2);
        this.velocityY = Math.round(Math.random() * 4 - 2);
        this.rotationSpeed = Math.random() * 0.06 - 0.03;
        var xrand = 0;
        var yrand = 0;
        xrand = Math.round(Math.random() * this.size - this.size / 2);
        yrand = Math.round(Math.random() * this.size - this.size / 2);
        this.pointList.push(new cPoint(xrand, yrand + 3 * this.size));
        xrand = Math.round(Math.random() * this.size - this.size / 2);
        yrand = Math.round(Math.random() * this.size - this.size / 2);
        this.pointList.push(new cPoint(xrand - 1 * this.size, yrand + 2 * this.size));
        xrand = Math.round(Math.random() * this.size - this.size / 2);
        yrand = Math.round(Math.random() * this.size - this.size / 2);
        this.pointList.push(new cPoint(xrand - 2 * this.size, yrand + 2 * this.size));
        xrand = Math.round(Math.random() * this.size - this.size / 2);
        yrand = Math.round(Math.random() * this.size - this.size / 2);
        this.pointList.push(new cPoint(xrand - 3 * this.size, yrand + this.size));
        xrand = Math.round(Math.random() * this.size - this.size / 2);
        yrand = Math.round(Math.random() * this.size - this.size / 2);
        this.pointList.push(new cPoint(xrand - 4 * this.size, yrand));
        xrand = Math.round(Math.random() * this.size - this.size / 2);
        yrand = Math.round(Math.random() * this.size - this.size / 2);
        this.pointList.push(new cPoint(xrand - 1 * this.size, yrand - 3 * this.size));
        xrand = Math.round(Math.random() * this.size - this.size / 2);
        yrand = Math.round(Math.random() * this.size - this.size / 2);
        this.pointList.push(new cPoint(xrand + 2 * this.size, yrand - 4 * this.size));
        xrand = Math.round(Math.random() * this.size - this.size / 2);
        yrand = Math.round(Math.random() * this.size - this.size / 2);
        this.pointList.push(new cPoint(xrand + 2 * this.size, yrand - 3 * this.size));
        xrand = Math.round(Math.random() * this.size - this.size / 2);
        yrand = Math.round(Math.random() * this.size - this.size / 2);
        this.pointList.push(new cPoint(xrand + 4 * this.size, yrand - 2 * this.size));
        xrand = Math.round(Math.random() * this.size - this.size / 2);
        yrand = Math.round(Math.random() * this.size - this.size / 2);
        this.pointList.push(new cPoint(xrand + 4 * this.size, yrand + this.size));
        xrand = Math.round(Math.random() * this.size - this.size / 2);
        yrand = Math.round(Math.random() * this.size - this.size / 2);
        this.pointList.push(new cPoint(xrand + 3 * this.size, yrand + 2 * this.size));
        xrand = Math.round(Math.random() * this.size - this.size / 2);
        yrand = Math.round(Math.random() * this.size - this.size / 2);
        this.color = color;
        this.lineWidth = line_width;
    }
}
class cCircle {
    constructor(x, y, radius, color = "red", line_width = 2, ctx) {
        this.x = 0;
        this.y = 0;
        this.radius = 10;
        this.lineWidth = 2;
        this.color = "red";
        this.draw = () => {
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.strokeStyle = this.color;
            this.ctx.lineWidth = this.lineWidth;
            this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            this.ctx.stroke();
            this.ctx.restore();
        };
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.lineWidth = line_width;
        this.ctx = ctx;
    }
}
// END OF HELPER LOGIC
var canvas;
var ctx;
var width = 1080;
var height = 620;
var redCircle;
var shape_array = new Array();
var level = 0;
//INITIAL FUNCTION
window.onload = () => {
    canvas = document.getElementById('cnvs');
    ctx = canvas.getContext("2d");
    // redCircle = new cCircle(20,20,50,'red',2,ctx);
    LoadGame();
    gameLoop();
};
// GAME LOOP FUNCTION
function gameLoop() {
    requestAnimationFrame(gameLoop);
    startGame();
} //GAMELOOP END
//Game Logic
function drawCircle(origenX, origenY, r, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 5;
    ctx.arc(origenX, origenY, r, 0, 2 * Math.PI);
    ctx.stroke();
}
function LoadGame() {
    loadLevel();
    loadAsteroids();
    loadShip();
    loadScore();
    loadLife();
    loadPowers();
    console.log('Game loaded!!!');
}
function loadLevel() {
    let currentLevel = level;
}
function loadAsteroids(level) {
    level = level ? level : 0;
    let limit = level + 7;
    for (let i = 0; i < limit; i++) {
        shape_array.push(new cAsteroid());
    }
    shape_array.push(new cCircle(20, 20, 50, 'red', 2, ctx));
    shape_array.push(new cCircle(20, 20, 50, 'blue', 2, ctx));
    console.log("Asteroids Loaded!!!");
}
function loadShip() { }
function loadScore() { }
function loadLife() { }
function loadPowers() { }
function startGame() {
    gameStage();
}
function gameStage() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    drawCircle(width / 2, height / 2, 100, 'green');
    let shape;
    for (var i = 0; i < shape_array.length; i++) {
        shape = shape_array[i];
        shape.draw();
    }
}
