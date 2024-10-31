export default class App {
  constructor() {}

  makeCanvas(width, height) {

    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.setAttribute("id", "canvas");
    document.body.appendChild(this.canvas);
    this.width = this.canvas.width = width || window.innerWidth;
    this.height = this.canvas.height = height || window.innerHeight;
  }
}
