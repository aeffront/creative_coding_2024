class App{
    constructor(name){
        this.name = name;
        this.canvas;
        this.context;
        this.width;
        this.height;
    }

    createCanvas(width, height){
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
        if(width && height){
            this.width = width;
            this.height = height;
            this.canvas.width = this.width;
            this.canvas.height = this.height;
        }
    }

    clearCanvas(){
        this.context.clearRect(0,0,this.width,this.height);
    }


}

export default App;