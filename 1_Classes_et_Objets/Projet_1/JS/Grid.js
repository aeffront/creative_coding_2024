import {circle, square, number} from './Items.js';

class Grid{
    constructor(width,height,subdivisions,gridType){
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
                let x = i * this.cellWidth;
                let y = j * this.cellHeight;
                if(this.gridType == 0){
                    let item = new circle(x,y,this.cellWidth/2,'black');
                    this.items.push(item);
                }
                else if(this.gridType == 1){
                    let item = new square(x,y,this.cellWidth,'black');
                    this.items.push(item);
                }
                else if(this.gridType == 2){
                    let item = new number(x,y,20,'black',`${i},${j}`);
                    this.items.push(item);
                }
                
            }
        }
    }
    draw(context){
        for(let i = 0; i < this.items.length; i++){
            this.items[i].draw(context);
        }
    }

}

export default Grid;