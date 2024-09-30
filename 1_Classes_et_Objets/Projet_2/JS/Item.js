class Item{
    constructor(u,v,shape){
        this.u = u;
        this.v = v;
        this.shape = shape;
    }
    draw(context){
        this.shape.draw(context);
    }
}

export default Item;