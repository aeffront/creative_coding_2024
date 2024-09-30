export class circle{
    constructor(x,y,size,color){
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }
    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
    }
}

export class square{
    constructor(x,y,size,color){
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }
    draw(context){
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.size, this.size);
    }
}

export class number{
    constructor(x,y,size,color,text){
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.text = text;
    }
    draw(context){
        context.fillStyle = this.color;
        context.font = this.size + 'px Arial';
        context.fillText(this.text, this.x, this.y);
    }
}

