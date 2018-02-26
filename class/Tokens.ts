import { Vector } from "./Vector";

export class Token{
    public name='Token created sucessfully'; // debugin purpose
    private tokenName:string;
    private velocity:Vector;
    private acc:Vector;
    public pos:Vector;
    private ctx;
    public r = 30;
    private shootPrecision:number=10;
    //array of radius
    private arrR=[];
    private angle=0;
    private ANGLE_VELOCITY= 0.05- Math.random()*0.1;
    private isMoving=false;
    private magnitude= 1 + (Math.random()*1);
    private worldWidth;
    private worldHeight;
    private fontSize='20';
    private fontType='Consolas';
    private color:string;
    constructor(tokenName:string,width:number,height:number,ctx:any,color:string,r?:number,x?:number,y?:number){
        this.tokenName=tokenName;
        this.color=color;
        this.worldWidth=width;
        this.worldHeight=height;
        let angle=Math.PI*2*Math.random();
        this.pos = new Vector(Math.random()*width, Math.random()* height);
        //if x or y  exists asign that else use the random value
        this.r=r?r:this.r;
        this.pos.x= x?x:this.pos.x;
        this.pos.y= y?y:this.pos.y;
        this.velocity= new Vector(Math.cos(angle),Math.sin(angle));
        this.velocity.multiplyBy(this.magnitude);
        this.ctx=ctx;
        
      
    }
    draw(){
        
        this.ctx.save(); 
        // save the unrotated context of the canvas so we can restore it later
        this.ctx.translate(this.pos.x,this.pos.y);

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
        this.ctx.fillText(this.tokenName, -10,10)

        

        // we’re done with the rotating so restore the unrotated context
        this.ctx.restore();
    }
    update(){
        this.pos.addTo(this.velocity);
        this.angle+=this.ANGLE_VELOCITY;
        
        if(this.pos.x > this.worldWidth+this.r){
            this.pos.x= -this.r;

        }else if(this.pos.x < -this.r){
            this.pos.x=this.worldWidth+this.r

        }else if(this.pos.y> this.worldHeight+this.r){
            this.pos.y=-this.r;

        }else if(this.pos.y< -this.r){
            this.pos.y=this.worldHeight+this.r;
        } 
    }
    polygon(ctx, x, y, r, sides) {
        if (sides < 3) return;
        var a = ((Math.PI * 2)/sides);
        ctx.beginPath();;
        ctx.translate(x,y);
        ctx.moveTo(r[0],0);
        for (var i = 1; i < sides; i++) {
          ctx.lineTo(r[i]*Math.cos(a*i),r[i]*Math.sin(a*i));
        }
        ctx.closePath();
    }
    break(laser){
        let d = this.distance(laser.pos,this.pos); return d<=this.r+this.shootPrecision;
    }
    distance(v1,v2){
        return Math.sqrt( Math.pow((v1.x-v2.x),2) + Math.pow( (v1.y-v2.y),2))
    }
   
    resetPos(){
        this.pos.x= -30 - Math.random()*30;
        this.pos.y= -30 - Math.random()*30
    }
}