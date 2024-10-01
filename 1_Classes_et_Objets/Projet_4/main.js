import App from './JS/App.js';
import Grid from './JS/Grid.js';

const width = window.innerWidth;
const height = window.innerHeight;

const app = new App('P4');
app.createCanvas(width, height);

const grid = new Grid(width/4,height/4,width/2,height/2,10,10,1);
grid.build();

grid.shuffle();

app.context.globalCompositeOperation = 'xor';

function animate(){
    app.clearCanvas();
    
    let allInPosition = grid.items.every((i)=>(i.isAtNewPosition==true));
    
    if(allInPosition){
        grid.gridType=Math.floor(Math.random()*3);
        grid.build(); 
        grid.shuffle();
    }
    grid.move(0.1);
    grid.draw(app.context);
    requestAnimationFrame(animate);
}

animate();