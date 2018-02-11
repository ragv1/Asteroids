import { Vector } from "./Vector";


export class Laser{
    private velocity:Vector;
    private acc:Vector;
    public pos:Vector;
    private ctx;
    private angle=-Math.PI/2;
    private offset=0;
    private worldWidth;
    private worldHeight;

    constructor(width:number,height:number,ctx:any, shipPos:Vector,angle,offset?:number){
        this.worldWidth=width;
        this.worldHeight=height;
        this.pos = new Vector(shipPos.x,shipPos.y);
        this.velocity= new Vector(Math.cos(angle),Math.sin(angle))
        this.velocity.multiplyBy(10);
        this.ctx=ctx;
        this.offset=offset;
    }

    draw(){
        // save the unrotated context of the canvas so we can restore it later
        this.ctx.save(); 
        this.ctx.beginPath(); 
        this.ctx.translate(this.pos.x,this.pos.y);
        // the circles
       
        this.ctx.arc(0,0,2,0, 2*Math.PI);
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
    }
    update(){
        this.pos.addTo(this.velocity)
    
    }
    outSide():boolean{
        if(this.pos.x > this.worldWidth ||this.pos.y> this.worldHeight||this.pos.x < 0||this.pos.y< 0){
            return true
        }else{
            return false;
        }
    }

}