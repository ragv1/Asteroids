import { Ship } from "./class/ship";
import { Asteroid } from "./class/Asteroid";
import { Laser } from "./class/Laser";
var width;
var height;
var ctx;
var canvas;
var ship:Ship;
var asteroids:Asteroid[]=[];
var laser:Laser[]=[];

function createCanvas(){
    canvas = <HTMLCanvasElement>document.createElement('canvas');
    canvas.setAttribute('id','cnvs');
    document.getElementsByTagName('body')[0].appendChild(canvas);
}
 function setCanvasSize() {
    canvas.width = window.innerWidth-30;
    canvas.height = window.innerHeight-30;
    width=canvas.width;
    height=canvas.height;
}
function attachEventListeners(){
    window.addEventListener("resize", function(){
        setCanvasSize();
        ship.setPosition(width,height);
    });
    canvas=document.getElementById('cnvs');
    canvas.tabIndex = 1;
    canvas.addEventListener("keydown",ship.keydownControls);
    canvas.addEventListener("keyup",ship.keyUpControls);
//  console.log(canvas );
}
function createShip(){
    ship = new Ship(width,height,ctx,laser);
    console.log(ship.name);
}
function createAsteroids(num){
    num= num? num:10;
    for (let i = 0; i < num; i++) {
        asteroids.push(new Asteroid(width,height,ctx) );
    }
    console.log('Asteroids Created Sucessfuly: ',num);   
}

// THE GAME
function gameLoop() {
    requestAnimationFrame(gameLoop);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    // Asteroids Drawing loop
    for (let i = 0; i < asteroids.length; i++) {
        asteroids[i].draw();
        asteroids[i].update();
        if( asteroids[i].hit(ship.pos) ){
            // TODO: delete one live
            console.log('minus one live');
        }
    }
    //lasers drawing loop
    for (let i = laser.length-1; i >=0; i--) {
        laser[i].draw();
        laser[i].update();
        for (let j = asteroids.length-1; j >=0; j--) {
            if (asteroids[j].break(laser[i]) ){
                let pos = asteroids[j].pos;
                let r= asteroids[j].r;
                asteroids.splice(j,1);
                laser.splice(i,1);
                asteroids.push(new Asteroid(width,height,ctx,r*0.50,pos.x,pos.y));
                asteroids.push(new Asteroid(width,height,ctx,r*0.50,pos.x,pos.y))
                break;
            } else if(laser[i].outSide()){
                laser.splice(i,1);
                break;
            }else if(asteroids[j].r<=5){            // asteroid minimum size
                asteroids.splice(j,1);
                break;
            }
        }
    }
   
    ship.draw();
    ship.update();
    ship.turn();
 }
 
 //Preload necesary stuff for the game
 window.onload = () => {
    createCanvas();
    setCanvasSize();
    canvas = <HTMLCanvasElement>document.getElementById('cnvs');
    ctx = canvas.getContext("2d");
    createShip();
    attachEventListeners();
    createAsteroids(5);
    gameLoop();
 }