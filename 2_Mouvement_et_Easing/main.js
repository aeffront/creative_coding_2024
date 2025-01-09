import {
  linear,
  easeInQuad,
  easeOutQuad,
  easeInOutQuad,
  easeInCubic,
  easeOutCubic,
  easeInOutCubic,
  easeInQuart,
  easeOutQuart,
  easeInOutQuart,
  easeInSine,
  easeOutSine,
  easeInOutSine,
  easeInExpo,
  easeOutExpo,
  easeInOutExpo,
  easeInCirc,
  easeOutCirc,
  easeInOutCirc,
  easeInElastic,
  easeOutElastic,
  easeInOutElastic,
  easeInBounce,
  easeOutBounce,
  easeInOutBounce
} from "./Easing.js";

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

let baseColor = Math.floor(Math.random()*360);

class ball{
  constructor(){
    this.ox = Math.random() * width;
    this.oy = Math.random() * height;
    this.x = this.ox;
    this.y = this.oy;
    this.dx = this.ox;
    this.dy = this.oy;
    this.Osize = (10*Math.random());
    this.size = this.Osize;
    this.maxSize = 50;
    this.speed = 0.005;
    this.time = 0.5;
    this.color = "hsl("+baseColor+(Math.random()*49)+", "+((Math.random()*10)+90)+"%, 50%)";
  }
  reset(){
    this.size = this.Osize;
    this.ox = this.x;
    this.oy = this.y;
    this.time=0.3;
  }

  update(){
    this.time+=this.speed;
    //this.x = this.ox + (this.dx-this.ox) * easeOutElastic(this.time);
    //this.y = this.oy + (this.dy-this.oy) * easeOutElastic(this.time);
    this.size = this.Osize +(this.Osize*10) * easeInOutElastic(this.time);
  }
  
  draw(){
    ctx.fillStyle = this.color;
    
    let char = "@";
    ctx.font = Math.abs(this.size)+"px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(char, this.x, this.y);
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, Math.abs(this.size), 0, Math.PI * 2);
    // ctx.fill();
  }

}

let balls = [];
for(let i=0; i<500; i++){
  balls.push(new ball());
}

const mb = new ball();

function animate(){
  ctx.clearRect(0, 0, width, height);
  balls.forEach(b=>{
    b.update();
    b.draw();
  });
  requestAnimationFrame(animate);
}


animate();

canvas.addEventListener("mousemove", (e)=>{
  balls.forEach(b=>{
    let d = Math.sqrt((e.clientX - b.x)**2 + (e.clientY - b.y)**2);
    if(d<b.size*2){
      b.reset();
    }
    b.dx = e.clientX;
    b.dy = e.clientY;
  });
  
});