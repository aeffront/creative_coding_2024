import App from './JS/App.js';
import Grid from './JS/Grid.js';

const width = window.innerWidth;
const height = window.innerHeight;

const app = new App('Projet_3');
app.createCanvas(width,height);

const grid = new Grid(app.width/4,app.height/4,app.width/2,app.height/2,10,6,2,'hsla(150,100%,70%,0.4)');
grid.build();

const msGrid = new Grid(0,0,app.width,app.height,100,60,2);
msGrid.build();


let start = new Date().getTime();

function getSeconds() {
  let now = new Date().getTime();
  let val = (((now - start) / 1000)%60);
  return val; 
}

function getMilliseconds() {
  let now = new Date().getTime();
  let val = (((now - start) / 10)%6000);
  return val; 
}

function main(){

  app.clearCanvas();
  msGrid.draw(app.context);
  grid.draw(app.context);
  
  let s = getSeconds();
  let ms = getMilliseconds()

  let color = (ms/6000)*360;

  grid.background = `hsla(${color+180},100%,0%,1)`;
  app.context.globalCompositeOperation = 'xor';

  grid.items.forEach((item)=>{
    if(item.v*grid.subdivisionsX+item.u < s){
      item.shape.text = "O";

    }
    else{
      item.shape.text = "X"

    };
    
  });
  msGrid.items.forEach((item)=>{
    if(item.v*msGrid.subdivisionsX+item.u < ms){
      item.shape.text = Math.floor((item.v*msGrid.subdivisionsX+item.u)/100);
      item.shape.color = `hsl(${color},100%,0%)`;
      item.shape.fill=false;
      item.shape.stroke=true;
    }
    else {
      item.shape.text = "0"
      item.shape.color = "black";
      item.shape.fill=true;
      item.shape.stroke=false;
    }
    
  });

  requestAnimationFrame(main);
}

main();