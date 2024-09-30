import App from './App.js';

let width = window.innerWidth;
let height = window.innerHeight;

const myApp = new App('firstApp');
myApp.createCanvas(500,500);


myApp.circle({
  x : width/2,
  y : height/2,
  radius:50,
  fill:true,
  fillColor:'red',
  stroke:true,
  strokeColor:'black'
});

window.addEventListener('resize',()=>{
  width = window.innerWidth;
  height = window.innerHeight;
  myApp.resizeCanvas(width,height);
  myApp.circle({
    x : width/2,
    y : height/2,
    radius:50,
    fill:true,
    fillColor:'red',
    stroke:true,
    strokeColor:'black'
  });
});