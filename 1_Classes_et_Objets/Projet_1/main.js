import App from './JS/App.js';
import particle from './JS/Particle.js';



const width = window.innerWidth;
const height = window.innerHeight;

const app = new App('Projet_1');
app.createCanvas(width,height);

let particles = [];

function checkParticles(){
  particles.forEach((p)=>{
    if(p.life <= 0){
      particles.splice(particles.indexOf(p),1);
    }
  });
}

let birth = false;
let cursor = {x:0,y:0};

function main(){
  app.clearCanvas();
  if(birth){
    particles.push(new particle(cursor.x,cursor.y,50,app.canvas,200,100));
  }
  checkParticles();
  particles.forEach((p)=>{
    p.update();
    p.drawChar(app.context);
  });
  requestAnimationFrame(main);
}

main();

window.addEventListener('mousedown', (e) => {
  birth = true;
  cursor.x = e.clientX;
  cursor.y = e.clientY;

});

window.addEventListener('mousemove', (e) => {
  cursor.x = e.clientX;
  cursor.y = e.clientY;
});

window.addEventListener('mouseup', (e) => {
  birth = false;
});


