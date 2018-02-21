export class Background{

    private context;
    private stars = 500;
    private colorrange = [0,60,240];
    private width;
    private height;

    constructor(context:any, width:number, height:number,stars?:number){
        this.context=context
        this.width=width
        this.height=height
        this.stars= stars?stars:this.stars;
    }

    draw(){
        let buffer = document.createElement('canvas');
        buffer.width=this.width;
        buffer.height=this.height;
        let context = buffer.getContext('2d')
        for (let i = 0; i < this.stars; i++) {
            let x = Math.random() * this.width;
            let y = Math.random() * this.height;
            let radius = Math.random() * 1.2;
            let hue = this.colorrange[this.getRandom(0,this.colorrange.length - 1)];
            let sat = this.getRandom(50,100);
            context.beginPath();
            context.arc(x, y, radius, 0, 360);
            context.fillStyle = "hsl(" + hue + ", " + sat + "%, 88%)";
            context.fill();
        }
        return buffer;
    }
    
     
    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }   
}