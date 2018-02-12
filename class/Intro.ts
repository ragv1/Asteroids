export class Screen{
    private fontSize;
    private fontType
    private xpos;
    private ypos;
    private ctx;
    private color;
    private message;

    constructor(fontSize:string, color:string, x:number, y:number,ctx,message) {
        this.fontSize = fontSize;
        this.fontType = 'Consolas';
        this.xpos = x;
        this.ypos = y; 
        this.ctx =ctx ;
        this.color=color;
        this.message=message;
    }
    draw(){
        this.ctx.font = this.fontSize + " " + this.fontType;
        this.ctx.fillStyle = this.color;
        this.ctx.fillText(this.message, this.xpos, this.ypos)
    }
    
}