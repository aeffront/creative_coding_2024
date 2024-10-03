import App from './JS/App.js';
import Grid from './JS/Grid.js';

const width = window.innerWidth;
const height = window.innerHeight;

const app = new App();
app.createCanvas(width,height);

const grid = new Grid(0,0,width,height,100,100,2); 
grid.build();
grid.draw(app.context);

const chars = [".",":","/","*","?","&","%","#","@","$"];

noise.seed(Math.random());
console.log(noise.simplex2(0,0));

function updateAscii(t,zoom){
  grid.items.forEach(item => {
    const val = Math.floor(((noise.simplex3(item.shape.x/zoom , item.shape.y/zoom,t )+1)/2 )*chars.length);
    item.shape.text = chars[val];
  });
}



//console.log(grid.items);

const zoom = 1000;


function animate(){
  app.clearCanvas();
  updateAscii(Date.now()*0.0002,zoom);
  grid.draw(app.context);
  requestAnimationFrame(animate);
}

animate();