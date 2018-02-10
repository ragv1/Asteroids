import { Vector } from "./Vector";

export class Ship{
    public name='Enterprise-SHIP: Created Sucessfuly'; // debugin purpose
    private velocity:Vector;
    private acc:Vector;
    public pos:Vector;
    private ctx;
    private r =20;
    private angle=-Math.PI/2;
    private ANGLE_VELOCITY=0;
    private isMoving=false;
    
    constructor(x:number,y:number,ctx:any){
        this.pos = new Vector(x,y);
        this.velocity= new Vector(0,0)
        this.ctx=ctx;
    }


    draw(){
        this.ctx.save(); 
        // save the unrotated context of the canvas so we can restore it later
        this.ctx.translate(this.pos.x,this.pos.y);

        
        //the rotation
        this.ctx.rotate(this.angle);

        // the triangle
        this.ctx.beginPath();
        this.ctx.moveTo(0, -this.r);
        this.ctx.lineTo(0,this.r);
        this.ctx.lineTo(2*this.r,0);
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
        if(this.isMoving===true){this.boost()}
        //create friction
        this.velocity.multiplyBy(0.99);
    }

    //rotation movement functions
    turn(){
        this.angle+=this.ANGLE_VELOCITY;
        this.velocity.setDirection(this.angle);
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



}