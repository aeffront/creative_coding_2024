class App{
    constructor(name){
        this.name = name;
        this.canvas;
        this.ctx;
    }

    createCanvas(width,height){
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
    }

    resizeCanvas(width,height){
        this.canvas.width = width;
        this.canvas.height = height;
    }

    circle({x,y,radius,fill,fillColor,stroke,strokeColor}){
        this.ctx.beginPath();
        this.ctx.arc(x,y,radius,0,2*Math.PI);
        if(fill){
            this.ctx.fillStyle = fillColor;
            this.ctx.fill();
        }
        if(stroke){
            this.ctx.strokeStyle = strokeColor;
            this.ctx.stroke();
        }
    }
}

export default App;