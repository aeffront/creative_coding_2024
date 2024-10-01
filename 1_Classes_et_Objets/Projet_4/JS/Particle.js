import lerp from './Functions.js';



class particle{
    constructor(x,y,size,canvas,colorA,colorRange){
        this.x;
        this.y;
        if(x && y){ this.x = x; this.y = y; }
        else{x = Math.random() * canvas.width; y = Math.random() * canvas.height; }
        this.size = size;
        this.vx = Math.random() * 2 - 1;
        this.vy = Math.random() * 2 - 1;
        this.charList = [0,1,2,3,4,5,6,7,8,9];
        this.char = this.charList[Math.floor(Math.random()*10)]
        this.life = 100;
        this.colorA = colorA;
        this.colorB = colorA + colorRange;

    }

    update(x,y){
        if(x && y){
            this.vx = (x - this.x) / 100;
            this.vy = (y - this.y) / 100;
        }

        this.x += this.vx;
        this.y += this.vy;
        this.life -= 1;
    }

    drawChar(ctx){
        ctx.fillStyle = `hsla(${lerp(this.colorA, this.colorB,this.life/100)},100%,70%,${this.life/100})`;
        ctx.font = this.size*(this.life/100) + 'px Arial';
        ctx.fillText(this.char, this.x, this.y);
    }
    drawCircle(ctx){
        ctx.fillStyle = `hsla(${lerp(this.colorA, this.colorB,this.life/100)},100%,70%,${this.life/100})`;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size*(this.life/100),0,Math.PI*2);
        ctx.fill();
    }
}

export default particle;
