function lerp (start, end, t) {
    return start * (1 - t) + end * t;
  }

function vectorDist(x1,y1,x2,y2){
    return Math.sqrt((x2-x1)**2 + (y2-y1)**2);
}



export default lerp;
