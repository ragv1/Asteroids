import { Vector } from "./Vector";
import { Laser } from "./Laser";

export class Ship{
    public name='Enterprise-SHIP: Created Sucessfuly'; // debugin purpose
    private velocity:Vector;
    private acc:Vector;
    public pos:Vector;
    private ctx;
    private r =20;
    public angle=-Math.PI/2;
    private ANGLE_VELOCITY=0;
    private isMoving=false;
    private worldWidth;
    private worldHeight;
    private laserArr:any[]=[];
    private unableShip:boolean=false;
    constructor(width:number,height:number,ctx:any,arr){
        this.worldWidth=width;
        this.worldHeight=height;
        this.pos = new Vector(width/2,height/2);
        this.velocity= new Vector(0,0)
        this.ctx=ctx;
        this.laserArr=arr;
    }


    draw(){
        this.ctx.save(); 
        // save the unrotated context of the canvas so we can restore it later
        this.ctx.translate(this.pos.x,this.pos.y);

        
        //the rotation
        this.ctx.rotate(this.angle);

        // the triangle                       
        this.ctx.beginPath();
        this.ctx.moveTo(-this.r, this.r);
        this.ctx.lineTo(-this.r/2,0);
        this.ctx.lineTo(-this.r,-this.r);
        this.ctx.lineTo(this.r,0);
        this.ctx.closePath();
        // the outline
        this.ctx.lineWidth = 10;
        this.ctx.strokeStyle = '#666666';
        
        // the fill color
        this.ctx.fillStyle = "#FFCC00";
        

        //the drawing
        this.ctx.stroke();
        this.ctx.fill();

        // we’re done with the rotating so restore the unrotated context
        this.ctx.restore();
    }
    
    update(){
        this.pos.addTo(this.velocity);
        
        if(this.pos.x > this.worldWidth+this.r+30){
            this.pos.x= -this.r-20;

        }else if(this.pos.x < -this.r-30){
            this.pos.x=this.worldWidth+this.r+20

        }else if(this.pos.y> this.worldHeight+this.r+30){
            this.pos.y=-this.r-20;

        }else if(this.pos.y< -this.r-30){
            this.pos.y=this.worldHeight+this.r+20;
        }

        if(this.isMoving===true){this.boost()}
        
        //inherent ship friction
        this.velocity.multiplyBy(0.99);
    }
    setPosition(newWidth:number,newHeight:number){
        this.pos.x-= (this.worldWidth-newWidth);
        this.pos.y-= (this.worldHeight-newHeight);
        this.worldWidth=newWidth;
        this.worldHeight=newHeight;
    }
    reset(){
        this.pos.x=this.worldWidth/2;
        this.pos.y=this.worldHeight/2;
        this.velocity=new Vector(0,0);
        this.angle= -Math.PI/2;
        this.move(false);
    }

    //rotation movement functions
    turn(){
        this.angle+=this.ANGLE_VELOCITY;
    }
    rotate(ang){
        this.ANGLE_VELOCITY=ang;
    }
    //linear movement functions
    boost(){
        let force = new Vector(Math.cos(this.angle), Math.sin(this.angle) );
        force.multiplyBy(0.2);
        this.velocity.addTo(force);
    }
    move(b:boolean){
        this.isMoving=b;
    }
    shoot(arr){
        arr.push(new Laser(this.worldWidth,this.worldHeight,this.ctx,this.pos,this.angle,this.r))
    }
    disableShip(){
        this.unableShip=true;
    }
    
    keyUpControls= (e) => {
        var code = e.keyCode;
        switch (code) {
            case 37: this.rotate(0); break; //Left key
            case 38: this.move(false); break; //Up key
            case 39: this.rotate(0); break; //Right key
            case 32: this.shoot(this.laserArr);break; //spacebar
            case 90: this.shoot(this.laserArr);break; // the 'z' key
            default: console.log(code); //Everything else
        }
        
    }
    keydownControls= (e) =>{
        var code = e.keyCode;
        switch (code) {
            case 37: this.rotate(-0.05);; break; //Left key
            case 38: this.move(true);   break; //Up key
            case 39: this.rotate(0.05); break; //Right key
            default: console.log(code); //Everything else
        }
    }



}
