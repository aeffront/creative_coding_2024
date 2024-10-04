export class circle{
    constructor({x,y,size,fill=true,fillColor='black',stroke=false,strokeColor='black',strokeWidth=1}){
        this.x = x;
        this.y = y;
        this.size = size;
        this.stroke = stroke;
        this.strokeColor = strokeColor;
        this.fill = fill;
        this.fillColor = fillColor;
        this.strokeWidth = strokeWidth
    }
    draw(context){
        context.beginPath();
        context.arc(this.x+(this.size/2), this.y+(this.size/2), Math.abs(this.size), 0, Math.PI * 2);
        context.fillStyle = this.fillColor;
        context.strokeStyle = this.strokeColor;
        context.lineWidth = this.strokeWidth;
        if(this.fill)context.fill();
        if(this.stroke)context.stroke();
    }
}

export class square{
    constructor({x,y,size,fill=true,fillColor='black',stroke=false,strokeColor='black',strokeWidth=1}){
        this.x = x;
        this.y = y;
        this.size = size;
        this.stroke = stroke;
        this.strokeColor = strokeColor;
        this.fill = fill;
        this.fillColor = fillColor;
        this.strokeWidth = strokeWidth
    }
    draw(context){
        context.fillStyle = this.fillColor;
        context.strokeStyle = this.strokeColor;
        context.lineWidth = this.strokeWidth;
        if(this.fill)context.fillRect(this.x, this.y, this.size, this.size);
        if(this.stroke)context.strokeRect(this.x, this.y, this.size, this.size);
    }
}

export class number{
    constructor({x,y,size,color,text,fill=true,fillColor='black',stroke=false,strokeColor='black',strokeWidth=1}){
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.text = text;
        this.stroke = stroke;
        this.strokeColor = strokeColor;
        this.fill = fill;
        this.fillColor = fillColor;
        this.strokeWidth = strokeWidth
    }
    draw(context){
        context.fillStyle = this.fillColor;
        context.strokeStyle = this.strokeColor;
        context.lineWidth = this.strokeWidth;
        context.font = (this.size/2) + 'px Arial';
        if(this.fill)context.fillText(this.text, this.x, this.y);
        if(this.stroke)context.strokeText(this.text, this.x, this.y);
    }
}

