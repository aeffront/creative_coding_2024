const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;


const audioContext = new AudioContext();
const duration = 120; // 2 minutes in seconds
const sampleRate = audioContext.sampleRate; // Use the sample rate of the AudioContext
const numChannels = 1; // Mono, change to 2 for stereo




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
source.connect(audioContext.destination);



function startAudioContext(){
  audioContext.resume().then(() => {
    console.log('Playback resumed successfully');
    source.start();
  });
  main();
  removeEventListener('click', startAudioContext);
}

function setup(){
  addEventListener('click', startAudioContext);
  
}

let points = [];

ctx.textAlign = 'center';
ctx.textBaseline = 'middle';

for(let i = 0; i < analyser.frequencyBinCount; i++){
  points.push({
    x: (i / analyser.frequencyBinCount) * width,
    y: 0
  });
}

let prev = 0;
function main(){
  let data = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(data);

  points.forEach((point, i) => {
    point.y = data[i/4];
  });

  ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.fillRect(0,0,width,height);

  ctx.fillStyle="white";

  for (let i = 0; i < 10; i++){

    points.forEach(point => {
      let letterIndex =  Math.floor(point.y)%2
      let text = letterIndex == 0 ? '1' : '2';
      ctx.fillText(text, point.x,(i*height/10)-point.y);
    });

  }


  requestAnimationFrame(main);

}

setup();