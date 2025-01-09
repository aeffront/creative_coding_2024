let size = 1;
let canvas = document.createElement("canvas");
canvas.setAttribute('id', 'canvas');
let ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

let sliderContainer = document.createElement("div");
document.body.appendChild(sliderContainer);

let sliderX = document.createElement("input");
sliderX.type = "range";
sliderX.min = 1;
sliderX.max = 100;
sliderX.value = 10;


sliderX.addEventListener("input", function(){
  subsX = this.value;
});

let sliderY = document.createElement("input");
sliderY.type = "range";
sliderY.min = 1;
sliderY.max = 100;
sliderY.value = 10;



sliderY.addEventListener("input", function(){
  subsY = this.value;
}
);

sliderContainer.setAttribute('id', 'sliderContainer');

sliderContainer.appendChild(sliderX);
sliderContainer.appendChild(sliderY);

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

let subsX = 10;
let subsY = 10;

HTMLCanvasElement.prototype.getPixelColor = function(x, y) {
  let ctx = this.getContext("2d");
  let pixel = ctx.getImageData(x, y, 1, 1).data;
  let val = (pixel[0] + pixel[1] + pixel[2])/(255*3);
  let chars = ['@', '#', '8', '&', 'o', ':', '*', ' ', ' '];
  val = Math.floor(val*(chars.length-1));
  let bg;
  let main;
  if(val<chars.length/2){
    bg = "white";
    main = "black";
  }
  else{
    bg = "black";
    main = "white";
  }

  
  

  let char = chars[val];
  
  return [char,bg,main];
};





function loop(){
  ctx.filter = "blur(50px) grayscale(100%)";

  ctx.drawImage(canvasElement, 0, 0,width,height);
  ctx.filter = "none";
  

  if(BD_box){
    let width = size*200;
    let height = 200*size;
    let x = BD_box.xCenter*canvas.width-width/2;
    let y = BD_box.yCenter*canvas.height-height/2;
    ctx.fillStyle = "white"
    //ctx.fillRect(x, y, width, height);

    let bgGrid = [];
    let charGrid = [];

    for(let i=0;i<subsX;i++){
      let bgCol = [];
      let charCol = [];
      for(let j=0;j<subsY;j++){


        let data = canvasElement.getPixelColor(x+width/subsX*i, y+height/subsY*j);

        bgCol.push(data[1]);
        charCol.push([data[0],data[2]]);

      }
      bgGrid.push(bgCol);
      charGrid.push(charCol);
    }

    bgGrid.forEach((col, i) => {
      col.forEach((bg, j) => {
        ctx.fillStyle = bg;
        ctx.fillRect(x + width / subsX * i, y + height / subsY * j, width / subsX, height / subsY);
      });
    });

    charGrid.forEach((col, i) => {
      col.forEach((item, j) => {
        let char = item[0];
        let col = item[1];

        ctx.font = `${width * 2 / Math.max(subsX,subsY)}px monospace`;
        ctx.textBaseline = "top";
        ctx.fillStyle = col;
        ctx.fillText(char, x + width / subsX * i, y + height / subsY * j);
      });
    });









  }

  if(Hands_data){

    if(Hands_data.multiHandLandmarks[0]){
      let fingers = [Hands_data.multiHandLandmarks[0][4],Hands_data.multiHandLandmarks[0][8]];
      let dist = Math.sqrt((fingers[0].x-fingers[1].x)**2+(fingers[0].y-fingers[1].y)**2);
     console.log(dist);
     size = (1+dist*20);
    }
    

    
  }

  
  



  

  requestAnimationFrame(loop);
}



loop();