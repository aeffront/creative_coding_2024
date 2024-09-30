
let width =  window.innerWidth;
let height =  window.innerHeight;

function createCanvas(width, height,){
  const canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  return[canvas];
};

const canvas = createCanvas(width, height)[0];
const ctx = canvas.getContext('2d');

class circle{
  constructor(x,y,radius,index){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.index = index;
  }

  draw(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius+(Math.sin(((this.index*6)+Date.now())*0.003))*(this.radius), 0, Math.PI * 2);

    ctx.fillStyle = `hsl(${Math.sin((this.index * 0.06)+Date.now()*0.001)*300}, 100%, 70%)`;
    ctx.fill();

    ctx.strokeStyle = `hsl(${Math.sin(((this.index * 0.06)+Date.now()*0.001)/2)*300}, 100%, 70%)`;
    ctx.lineWidth = 2;
    ctx.stroke();
    
  }
}

let circles = [];
let cols = 20;
let rows = 20;

for(let i = 0;i<rows;i++){
  for(let j =0;j<cols;j++){
    const c = new circle((j * width/cols) +(width/cols)/2,(i*height/rows)+(height/rows)/2,(width/cols)*0.25, (i*cols)+j);
    circles.push(c);
  }
}

function main(){
  
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);
  circles.forEach((c) => {
    c.draw()
    console.log(c)
  });
  requestAnimationFrame(main);

}

main();

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  circles = [];
  for(let i = 0;i<cols;i++){
    for(let j =0;j<rows;j++){
      const c = new circle(j * width/cols +(width/cols)/2,(i*height/rows)+(height/rows)/2,10, (i*cols)+j);
      circles.push(c);
    }
  }
});



