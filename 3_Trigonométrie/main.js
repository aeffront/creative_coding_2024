import App from "./JS/App.js";
import DrawTool from "./JS/DrawTool.js";

const app = new App();
app.makeCanvas();

let pen = {
  x: app.width / 2 + Math.sin(Date.now() / 1000) * app.width/20,
  y: app.height / 2 + Math.cos(Date.now() / 1010) * app.width/20,
  update: function () {
    this.x = app.width / 2 + Math.sin(Date.now() / 100) * app.width/20;
    this.y = app.height / 2 + Math.cos(Date.now() / 100) * app.width/20;
  },
};

const drawTool = new DrawTool({
  distortion_amplitude: 10,
  distortion_factor: 101,
});

function main() {
  pen.update();
  app.ctx.clearRect(0, 0, app.width, app.height);
  drawTool.addPoint(pen.x, pen.y);
  if(drawTool.points.length>10000){
    const diff = drawTool.points.length - 10000;
    drawTool.points.splice(0,diff);
  }
  drawTool.draw(app.ctx);

  requestAnimationFrame(main);
}

main();

let mouse = {
  x: 0,
  y: 0,
};

let drag = 
{
  x: 0,
  y: 0,
};

window.addEventListener("mousedown",(e)=>{
  document.getElementById("instruction").style.display = "none";
  drag.x=drag.y=0;
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  catchPoints()
  window.addEventListener("mousemove", (e) => {
    drag.x = e.clientX - mouse.x;
  drag.y = e.clientY - mouse.y;
  movePoints();
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  
})

window.addEventListener("mouseup", (e) => {
  
  console.log(drag);
  movePoints();
  subdivide();
  selectedPoints = [];
  
});

let selectedPoints = [];

function catchPoints(){
  drawTool.points.forEach((point)=>{
    let d = Math.sqrt((point.x - mouse.x) ** 2 + (point.y - mouse.y) ** 2);
    if(d<100){
      selectedPoints.push(point);
    }
  });
}

function movePoints(){
  selectedPoints.forEach((point)=>{
    point.x += drag.x;
    point.y += drag.y;
  });
}


function subdivide() {
  drawTool.points = drawTool.points.flatMap((point, index, array) => {
    if (index === array.length - 1) return [point];
    const nextPoint = array[index + 1];
    const d = Math.sqrt((nextPoint.x - point.x) ** 2 + (nextPoint.y - point.y) ** 2);
    const subs = Math.floor(d / 3);
    const dx = (nextPoint.x - point.x) / subs;
    const dy = (nextPoint.y - point.y) / subs;
    const newPoints = [];
    for (let i = 1; i < subs; i++) {
      newPoints.push({
        x: point.x + i * dx,
        y: point.y + i * dy,
      });
    }
    return [point, ...newPoints];
  });
}