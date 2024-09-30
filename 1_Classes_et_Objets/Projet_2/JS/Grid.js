import {circle, square, number} from './Shapes.js';
import Item from './Item.js';

class Grid{
    constructor(x,y,width,height,subdivisions,gridType){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.subdivisions = subdivisions;
        this.cellWidth = this.width / this.subdivisions;
        this.cellHeight = this.height / this.subdivisions;
        this.gridType;
        if(gridType) this.gridType = gridType;
        else this.gridType = 0;
        this.items = [];
    }

    build(){
        for(let i = 0; i < this.subdivisions; i++){
            for(let j = 0; j < this.subdivisions; j++){
                let x = ((i+0.5) * this.cellWidth)+this.x;
                let y = ((j+0.5) * this.cellHeight)+this.y;
                if(this.gridType == 0){
                
                    let shape = new circle(x,y,this.cellWidth/2,'black');
                    let item = new Item(j,i,shape);
                    this.items.push(item);
                }
                else if(this.gridType == 1){
                    let shape = new square(x,y,this.cellWidth,'black');
                    let item = new Item(j,i,shape);
                    this.items.push(item);
                }
                else if(this.gridType == 2){
                    let shape = new number(x,y,20,'black',`${i},${j}`);
                    let item = new Item(j,i,shape);
                    this.items.push(item);
                }
                
            }
        }
        console.log(this.items);
    }
    draw(context){
        this.items.forEach((item)=>{
            item.draw(context);
        });
    }

}

export default Grid;