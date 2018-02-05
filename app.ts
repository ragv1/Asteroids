//Helper logic
class cPoint {
    public x: number = 0;
    public y: number = 0;
    constructor(x: number = 0, y: number = 0) {
       this.x = x;
       this.y = y;
    }
 }
/**
 * Asteroid Class
 */
class cAsteroid implements iShape {
    public x: number = 0;
    public y: number = 0;
    public velocityX: number = 0;
    public velocityY: number = 0;
    public lineWidth: number = 5;
    public color: string = "white";
    public size: number = 20;
    public rotation: number = 0;
    public rotationSpeed: number = 0;
    public pointList: Array<cPoint> = new Array<cPoint>();
   
    public draw = (): void => {
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
   
     for (var i: number = 0; i < this.pointList.length; i++) {
      ctx.lineTo(this.pointList[i].x, this.pointList[i].y);
     }
   
     ctx.closePath();
     ctx.stroke();
     ctx.restore();
    }
   
    constructor(x: number = undefined, y: number = undefined, size: number = undefined, 
           color: string = "white", line_width: number = 2) {
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
   
     var xrand: number = 0;
     var yrand: number = 0;
   
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

class cCircle implements iShape {
    public x: number = 0;
    public y: number = 0;
    public radius: number = 10;
    public lineWidth: number = 2;
    public color: string = "red";
    public ctx:any;
    constructor(x: number, y: number, radius: number, color: string = "red", line_width: number = 2,ctx:any)
    {
       this.x = x;
       this.y = y;
       this.radius = radius;
       this.color = color;
       this.lineWidth = line_width;
       this.ctx=ctx;
    }
    public draw = (): void => {
       this.ctx.save();
       this.ctx.beginPath();
       this.ctx.strokeStyle = this.color;
       this.ctx.lineWidth = this.lineWidth;
       this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
       this.ctx.stroke();
       this.ctx.restore();
    }
 }

interface iShape {
    draw(): void;
    x: number;
    y: number;
    color: string;
    lineWidth: number;
 }

// END OF HELPER LOGIC

var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;
var width:number=1080;
var height:number=620;
var redCircle;
var shape_array: Array<iShape> = new Array<iShape>();
var level:number=0;

//INITIAL FUNCTION

 window.onload = () => {
    canvas = <HTMLCanvasElement>document.getElementById('cnvs');
    ctx = canvas.getContext("2d");
    // redCircle = new cCircle(20,20,50,'red',2,ctx);
    LoadGame();
    gameLoop();
 }

// GAME LOOP FUNCTION
 function gameLoop() {
    requestAnimationFrame(gameLoop);
    startGame();
  
     
 }//GAMELOOP END

//Game Logic

 function drawCircle(origenX:number,origenY:number,r:number,color:string){
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 5;
    ctx.arc(origenX, origenY, r, 0, 2 * Math.PI);
    ctx.stroke();
 }

 function LoadGame():void{
    loadLevel(); 
    loadAsteroids();
    loadShip();
    loadScore();
    loadLife();
    loadPowers();
    console.log('Game loaded!!!');
 }

function loadLevel(){
    let currentLevel=level;
}

function loadAsteroids(level?:number){
    level= level?level:0;
    let limit =level +7;
    for (let i = 0; i < limit; i++) {
        shape_array.push(new cAsteroid());   
    }
    shape_array.push(new cCircle(20,20,50,'red',2,ctx) );
    shape_array.push(new cCircle(20,20,50,'blue',2,ctx));
    console.log("Asteroids Loaded!!!");
}

function loadShip(){}

function loadScore(){}

function loadLife(){}

function loadPowers(){}

function startGame(){
    gameStage();
}

function gameStage(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    drawCircle(width/2,height/2,100,'green');
    
    let shape: iShape;
    for (var i: number = 0; i < shape_array.length; i++) {
        shape = shape_array[i];
        shape.draw();
    }

}