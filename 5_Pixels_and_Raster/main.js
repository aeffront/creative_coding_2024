
class Webcam {
  constructor() {
    this.video = document.createElement('video');
    this.video.style.display = 'none';
    this.video.setAttribute('autoplay', '');
    this.video.setAttribute('playsinline', '');
    document.body.appendChild(this.video);
    this.tempCanvas = document.createElement('canvas');
    this.gridDimensions = { width: 10, height: 10 };
    this.tempCanvas.width = this.gridDimensions.width;
    this.tempCanvas.height = this.gridDimensions.height;
    this.tempContext = this.tempCanvas.getContext('2d');

    this.drawCanvas = document.createElement('canvas');
    this.drawCanvas.width = window.innerWidth;
    this.drawCanvas.height = window.innerHeight;
    this.drawContext = this.drawCanvas.getContext('2d');
    document.body.appendChild(this.drawCanvas);
    this.drawCanvas.setAttribute('class', 'drawCanvas');

    this.grid = [];

    this.threshold = 550;
    this.points = [];



    
    this.currentFrame = null;
    
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        this.video.srcObject = stream;
      })
      .catch(err => {
        console.error('Error accessing webcam: ', err);
      });

    this.video.addEventListener('loadeddata', () => {
      this.captureFrame();
    });
  }

  captureFrame() {
    
    this.tempContext.drawImage(this.video, 0, 0, this.tempCanvas.width, this.tempCanvas.height);

    this.currentFrame = this.tempContext.getImageData(0, 0, this.tempCanvas.width, this.tempCanvas.height);
    const width = this.tempCanvas.width;
    const height = this.tempCanvas.height;
    this.grid = [];
    this.points = [];

    for (let y = 0; y < height; y++) {
      const row = [];
      for (let x = width; x >0; x--) {
        const index = (y * width + x) * 4;
        const r = this.currentFrame.data[index];
        const g = this.currentFrame.data[index + 1];
        const b = this.currentFrame.data[index + 2];
        const a = this.currentFrame.data[index + 3];
        row.push({ r, g, b, a });

        const cellWidth = this.drawCanvas.width / this.gridDimensions.width;
        const cellHeight = this.drawCanvas.height / this.gridDimensions.height;

      }

     
      this.grid.push(row);
    }
    
    
    this.draw();
    requestAnimationFrame(() => this.captureFrame());
  }

  draw(){

    this.drawContext.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);

    const cellWidth = this.drawCanvas.width / this.gridDimensions.width;
    const cellHeight = this.drawCanvas.height / this.gridDimensions.height;



    for (let y = 0; y < this.gridDimensions.height; y++) {
      for (let x = 0; x < this.gridDimensions.width; x++) {
        const cell = this.grid[y][x];
        let val = ((cell.r + cell.g + cell.b) / 3)/255*10 ;
        //this.drawContext.fillStyle = `rgba(${cell.r}, ${cell.g}, ${cell.b}, ${cell.a})`;
        //this.drawContext.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);

        const asciiChars = ['@', '#', '8', '&', 'o', ':', '*', '.', ' '];
        const charIndex = Math.floor(val / 10 * (asciiChars.length - 1));

      if(val > 5){
        
      
      this.drawContext.fillStyle = 'black';
      this.drawContext.font = `${cellHeight*2}px monospace`;
      this.drawContext.fillText(asciiChars[charIndex], x * cellWidth, y * cellHeight + cellHeight);
      }
      else{
        this.drawContext.fillStyle = 'black';
        this.drawContext.font = `${cellHeight*2}px monospace`;
        this.drawContext.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
        this.drawContext.fillStyle = 'white';
        this.drawContext.fillText(asciiChars[charIndex], x * cellWidth, y * cellHeight + cellHeight);
      }
      }
    }

  }

  updateResolution(width, height){
    this.gridDimensions.width = width;
    this.gridDimensions.height = height;
    this.tempCanvas.width = width;
    this.tempCanvas.height = height;

  }

  

  


  

}

const x_reso_slider = document.getElementById('x_resolution');
const y_reso_slider = document.getElementById('y_resolution');

x_reso_slider.addEventListener('input', () => {
  webcam.updateResolution(x_reso_slider.value, webcam.gridDimensions.height);
});

y_reso_slider.addEventListener('input', () => {
  webcam.updateResolution(webcam.gridDimensions.width, y_reso_slider.value);
});

const webcam = new Webcam();