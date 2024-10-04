class Item{
    constructor(u,v,shape){
        this.u = u;
        this.v = v;
        this.shape = shape;
        this.nextPosition = {u:u,v:v};
        this.isAtNewPosition = false;
    }
    draw(context){
        this.shape.draw(context);
    }
}

export default Item;