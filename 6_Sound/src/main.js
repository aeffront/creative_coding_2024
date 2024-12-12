import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const tempCanvas = document.createElement('canvas');
const tempCtx = tempCanvas.getContext('2d');
const width = tempCanvas.width = window.innerWidth;
const height = tempCanvas.height = window.innerHeight;

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

document.body.style.cursor = 'none';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

scene.background = new THREE.Color( "white" );

renderer.domElement.style.visibility = 'hidden';
const audioContext = new AudioContext();
const duration = 120; // 2 minutes in seconds
const sampleRate = audioContext.sampleRate; // Use the sample rate of the AudioContext
const numChannels = 1; // Mono, change to 2 for stereo

let controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;


const analyser = audioContext.createAnalyser();
analyser.fftSize = 2048;
analyser.smoothingTimeConstant = 0.9;
const source = audioContext.createBufferSource(numChannels, sampleRate * duration, sampleRate);
source.connect(analyser);
fetch('./stutter.wav')
  .then(response => response.arrayBuffer())
  .then(data => audioContext.decodeAudioData(data))
  .then(buffer => {
    source.buffer = buffer;
  })
  .catch(e => console.error('Error with decoding audio data', e));

source.connect(analyser);
source.connect(audioContext.destination);


let frequencyData = new Uint8Array(analyser.frequencyBinCount);
analyser.getByteFrequencyData(frequencyData);

const size = Math.floor(frequencyData.length/10)


let geoData = [];

for (let i=0; i<size; i++){
  let line = []
    for (let j=0; j<size; j++){
      line.push(0);

    }
    geoData.push(line);
}

function updateGrid(){
  for (let i=size-1;i>0;i--){
    geoData[i] = geoData[i-1];
  }
  let freqData=[];
  for(let i=0; i<size; i++){
    freqData[i] = frequencyData[i*10]/1000;
  }
  geoData[0] = freqData;

}

let drawLines = false;


function drawAscii(){
 ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = 'red';
  tempCtx.filter = 'blur(0px)';
  if(drawLines)ctx.drawImage(renderer.domElement, 0, 0, width, height);
  else{
  
  tempCtx.drawImage(renderer.domElement, 0, 0, width, height);
  let sub = 150;
  let ascii = ['0', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
  let str = '';
  for (let i=0; i<sub; i++){
    for (let j=0; j<sub; j++){
      let data = tempCtx.getImageData(j * (width / sub), i * (height / sub), 1, 1).data
      
      let index = Math.floor((((data[0] + data[1] + data[2]) ) *150));
      index = Math.min(index, 10);
      index = Math.max(index, 0);
      str += ascii[index];
      ctx.font = '10px monospace';
      ctx.fillText(ascii[index], j * (width / sub), i * (height / sub));
    }
    str += '\n';
  }
}
  
}

updateGrid()

let ambLight = new THREE.AmbientLight(0x404040,1);
scene.add(ambLight);

let gap = 0.1;

let vertices = [];

geoData.forEach((line, i) => {
  line.forEach((value, j) => {
    vertices.push(new THREE.Vector3((j-(size/2))*gap, value*10, (i-(size/2))*gap));
  });
});

let geometry = new THREE.BufferGeometry().setFromPoints(vertices);


let material = new THREE.MeshBasicMaterial({ 
  color: new THREE.Color("black"),
  wireframe: false,
  side: THREE.DoubleSide
});

let plane = new THREE.Mesh(geometry, material);
let line = new THREE.Line(geometry, material);

scene.add( plane );
scene.add( line );

camera.position.z = 5;

function animate() {

  if(Math.random() > 0.9){
    drawLines = !drawLines;
  }
  

  
  tempCtx.drawImage(renderer.domElement, 0, 0, width, height);
  drawAscii();
  
  
  camera.position.y = Math.sin((Date.now()/10000)+Math.PI/2)*3;
  camera.lookAt(0,0,0);

  requestAnimationFrame( animate );
  
  analyser.getByteFrequencyData(frequencyData);


  updateGrid();

  vertices = [];

  geoData.forEach((line, i) => {
    line.forEach((value, j) => {
      vertices.push(new THREE.Vector3((j-(size/2))*gap, value*10, (i-(size/2))*gap));
    });
  });

  geometry.setFromPoints(vertices);
  geometry.rotateZ(Math.sin(Date.now()/10000));
  geometry.rotateY(Math.cos(Date.now()/10000));



  renderer.render( scene, camera );
}




function setup(){

  audioContext.resume().then(() => {
    console.log('Playback resumed successfully');
    source.start();
    animate();

  });

  document.removeEventListener('click', setup);
}


document.addEventListener('click',setup);




