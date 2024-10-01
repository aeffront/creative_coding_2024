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
        this.items = [];
        for(let i = 0; i < this.subdivisionsY; i++){
            for(let j = 0; j < this.subdivisionsX; j++){
                let x = ((j+0.5) * this.cellWidth)+this.x;
                let y = ((i+0.5) * this.cellHeight)+this.y;
                if(this.gridType == 0){
                
                    let shape = new circle({
                        x:x,
                        y:y,
                        size:Math.random()*this.cellWidth/2});
                        
                    let item = new Item(j,i,shape);
                    this.items.push(item);
                }
                else if(this.gridType == 1){
                    let shape = new square({
                        x:x,
                        y:y,
                        size:Math.random()*this.cellWidth});

                    let item = new Item(j,i,shape);
                    this.items.push(item);
                }
                else if(this.gridType == 2){
                    let shape = new number({
                        x:x,
                        y:y,
                        size:this.cellHeight*1.5,
                        text:`${i},${j}`});
                    let item = new Item(j,i,shape);
                    this.items.push(item);
                }
                
            }
        }
        console.log(this.items);
    }
    shuffle(){
        const itemsCopy= [];
        this.items.forEach((i)=>{
            itemsCopy.push(i);
        });
        itemsCopy.push(this.items); 
        this.items.forEach((i)=>{
            const index = Math.floor(Math.random()*(itemsCopy.length-1));
            const item = itemsCopy[index];
            i.nextPosition = {u:item.u, v:item.v};
            itemsCopy.splice(index,1);
            item.isAtNewPosition = false;
        });
    }
    move(speed){
       
        this.items.forEach((item)=>{
            const ox = item.shape.x;
            const oy = item.shape.y;
            const dx = ((item.nextPosition.u*this.cellWidth)-ox)+this.x;
            const dy = ((item.nextPosition.v*this.cellHeight)-oy)+this.y;
            item.shape.x += dx*speed;
            item.shape.y += dy*speed;

            const d = Math.sqrt(dx*dx+dy*dy);
            if(d<1){ 
                item.isAtNewPosition = true;
                
            }
        });
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