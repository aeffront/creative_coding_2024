import App from './JS/App.js';
import Grid from './JS/Grid.js';



const width = window.innerWidth;
const height = window.innerHeight;

const app = new App('Projet_1');
app.createCanvas(width,height);

const grid = new Grid(app.width/4,app.height/4,app.width/2,app.height/2,10,2);
grid.build();
console.log(grid);
grid.draw(app.context);

const basColor = 140;
const colorRange = 50;

const speed = 0.001;


function main(){
  app.clearCanvas();
  grid.items.forEach((item)=>{
    item.shape.size = (((Math.sin(item.u+Date.now()*speed)*2)-1)*grid.cellWidth*0.05)*(((Math.cos(item.v+Date.now()*speed)*2)-1)*grid.cellWidth*0.2);
    item.shape.color = `hsl(${(Math.sin(item.u+Date.now()*speed)*colorRange)+basColor},100%,50%)`;
  });
  grid.draw(app.context);
  
  requestAnimationFrame(main);
}

main();


