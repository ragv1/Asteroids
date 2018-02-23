import { Ship } from "./class/ship";
import { Asteroid } from "./class/Asteroid";
import { Laser } from "./class/Laser";
import { Score } from "./class/Score";
import { Screen  } from "./class/Intro";
import { Background } from "./class/background";
var width;
var height;
var ctx;
var canvas;
var ship:Ship;
var asteroids:Asteroid[]=[];
var laser:Laser[]=[];
var score:Score;
var counter:number=0;
var introScreen:Screen;
var idAnimation;
var idGameLoop;
var idGameOver;
var info:Screen;
var info2:Screen;
var endScreen:Screen;
var endInfo:Screen;
var level:number=0;
var frame=0;
var background;
function createBackground(context,width,height,starts?){
    let bg = new Background(context,width,height,starts);
    background = bg.draw();
}
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
    canvas.addEventListener("click",startGame);
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
function createScore(fontSize:string,fontType:string,color:string,width:number,height:number,ctx){
    score= new Score(fontSize,fontType,color,width,height,ctx)
}
function endGame(){
    cancelAnimationFrame(idGameLoop);
    score.disableScore();
    ship.reset();
    canvas.removeEventListener("keydown",ship.keydownControls);
    canvas.removeEventListener("keyup",ship.keyUpControls);
    canvas.addEventListener("click",restartGame);
    gameOver();
    return true;
}
function restartGame(){
    cancelAnimationFrame(idGameOver);
    loadGame(false);
}
function gameOver(){
    idGameOver= requestAnimationFrame(gameOver);
    endScreen.draw();
    endInfo.draw();
}
function startGame(){
    canvas.removeEventListener("click",startGame);
    cancelAnimationFrame(idAnimation);
    gameLoop();
}
function gameIntro(){
    idAnimation = requestAnimationFrame(gameIntro);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < asteroids.length; i++) {
       asteroids[i].draw();
       asteroids[i].update();
   }
    introScreen.draw();
    info.draw();
    info2.draw();
}
function loadGame(newGame:boolean){
    if(newGame){createCanvas()}
    if(!newGame){
        canvas.removeEventListener("click",restartGame);
        asteroids=[];
    }
    setCanvasSize();
    canvas = <HTMLCanvasElement>document.getElementById('cnvs');
    ctx = canvas.getContext("2d");
    createBackground(ctx,width,height);
    createShip();
    attachEventListeners();
    createAsteroids(5);
    createScore('30px','Consolas','white',width,height,ctx);
    introScreen=new Screen('40px','red',width/6,height/3,ctx,'Click en la pantalla para empezar');
    info= new Screen('30px','white',width/6,height/2,ctx,'Use las flechas para Moverse');
    info2= new Screen('30px','white',width/6,height/1.8,ctx,'Use la tecla de Espacio para disparar');
    endScreen=new Screen('40px','red',width/6,height/3,ctx,'Game Over');
    endInfo =new Screen('30px','yellow',width/6,height/2.6,ctx,'Click to Restart');
    gameIntro();
}
function levelUp(){
    level++;
    if(score.lives<=100){ 
        score.lives++;
    }
    createAsteroids(level+5);
    score.incrementLevel();

}
// THE GAME
function gameLoop() {
   idGameLoop= requestAnimationFrame(gameLoop);
    // frame++;
    // console.log(Math.round(frame/60));

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(background,0,0);
    //Chek for lives
    if(score.lives<=0){
        endGame();
     }
   
    for (let i = asteroids.length-1; i >= 0; i--) {
        if(asteroids[i].r<=5){asteroids.splice(i,1);continue;}
        asteroids[i].draw();
        asteroids[i].update();
        if( asteroids[i].hit(ship.pos,ship.r) ){
            if(score.lives<=0){
                endGame();
            }else{
                let copyAsteroid = asteroids[i];
                copyAsteroid.resetPos();
                asteroids.splice(i,1);
                ship.reset();
                asteroids.push(copyAsteroid);
                score.reduce();
                break;
            }
            
        }
        
    }
    //Check if the level is completed
    if(asteroids.length<1){ level++; levelUp();}

    //lasers drawing loop
    for (let i = laser.length-1; i >=0; i--) {
        laser[i].draw();
        laser[i].update();
        for (let j = asteroids.length-1; j >=0; j--) {
            if (asteroids[j].break(laser[i]) ){
                score.increment();
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
            }
        }
    }
   
    ship.draw();
    ship.update();
    ship.turn();
    // Score Drawing and updating counter
    score.update();
 }

//Preload necesary stuff for the game
window.onload = () => {
    loadGame(true);
}