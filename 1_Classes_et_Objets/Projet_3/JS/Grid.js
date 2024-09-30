import {circle, square, number} from './Shapes.js';
import Item from './Item.js';

class Grid{
    constructor(x,y,width,height,subdivisionsX,subdivisionsY,gridType,background){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.subdivisionsX = subdivisionsX;
        this.subdivisionsY = subdivisionsY;
        this.cellWidth = this.width / this.subdivisionsX;
        this.cellHeight = this.height / this.subdivisionsY;
        this.gridType;
        if(gridType) this.gridType = gridType;
        else this.gridType = 0;
        this.items = [];
        this.background;
        if(background) this.background = background;
        else this.background = 'rgba(0,0,0,0)';
    }

    build(){
        for(let i = 0; i < this.subdivisionsY; i++){
            for(let j = 0; j < this.subdivisionsX; j++){
                let x = ((j+0.5) * this.cellWidth)+this.x;
                let y = ((i+0.5) * this.cellHeight)+this.y;
                if(this.gridType == 0){
                
                    let shape = new circle(x,y,this.cellWidth/2);
                    let item = new Item(j,i,shape);
                    this.items.push(item);
                }
                else if(this.gridType == 1){
                    let shape = new square(x,y,this.cellWidth);
                    let item = new Item(j,i,shape);
                    this.items.push(item);
                }
                else if(this.gridType == 2){
                    let shape = new number(x,y,this.cellWidth*1.5,`${i},${j}`);
                    let item = new Item(j,i,shape);
                    this.items.push(item);
                }
                
            }
        }
        console.log(this.items);
    }
    draw(context){
        context.fillStyle = this.background;
        context.fillRect(this.x+(this.cellWidth/3),this.y-(this.cellHeight/3),this.width,this.height);
        this.items.forEach((item)=>{
            item.draw(context);
        });
    }

}

export default Grid;