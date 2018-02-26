export class Score{
    public score:number=0;
    public lives:number=5;
    private level:number=1;
    private fontSize;
    private fontType
    private worldWidth;
    private worldHeight;
    private ctx;
    private color;
    private unableScore:boolean=false;
<<<<<<< HEAD
    
=======
    public level:number=1;
>>>>>>> gh-pages

    constructor(fontSize:string, fontType:string, color:string, worldWidth:number, worldHeight:number,ctx) {
        this.fontSize = fontSize;
        this.fontType = fontType;
        this.worldWidth = worldWidth;
        this.worldHeight = worldHeight; 
        this.ctx =ctx ;
        this.score=0;
        this.color=color;
    }
    draw(){
        this.ctx.font = this.fontSize + " " + this.fontType;
        this.ctx.fillStyle = this.color;
        this.ctx.fillText('Puntos: '+this.score+'\nVidas: '+this.lives, this.worldWidth*0.1, this.worldHeight*0.1)
        this.ctx.fillText('Nivel: '+this.level, this.worldWidth*0.1, this.worldHeight*0.2)
    }
    update(){  
        this.draw();
    }
    increment(){
        if(this.unableScore){return} 
        this.score++
    }
    incrementLevel(){
        this.level++;
    }
    reduce(){
        this.lives--;
    }
    disableScore(){
        this.unableScore=true;
    }
}