export default class DrawTool {
  constructor({ color, lineWidth, distortion_amplitude, distortion_factor }) {
    this.points = [];
    this.color = color || "black";
    this.lineWidth = lineWidth || 1;
    this.distortion_amplitude = distortion_amplitude || 0;
    this.distortion_factor = distortion_factor || 0;
  }
  addPoint(x, y) {
    this.points.push({ x: x, y: y });
  }
  draw(context) {
    context.beginPath();
    context.moveTo(this.points[0].x, this.points[0].y);
    
    for (let i = 1; i < this.points.length; i++) {
      context.lineTo(
        this.points[i].x + Math.sin(Date.now() / 1000 + i*0.001) * this.distortion_amplitude,
        this.points[i].y +
          Math.sin((Date.now() / 1000)  + i*this.distortion_factor*0.001) *
            this.distortion_amplitude
      );
    }
    context.stroke();
  }
}
