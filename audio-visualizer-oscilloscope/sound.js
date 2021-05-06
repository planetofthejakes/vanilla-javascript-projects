import hslToRgb from './utils';

const WIDTH = 3000;
const HEIGHT = 1000;
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = WIDTH;
canvas.height = HEIGHT;
let analyzer; // make it easy and scope to sound.js instead of piping thru each function
let bufferLength;

function handleError(err) {
  console.log('you must give acces to your mic in order to proceed');
}

async function getAudio() {
  // access to the users microphone
  const stream = await navigator.mediaDevices.getUserMedia({audio: true}).catch(handleError);
  const audioCtx = new AudioContext();
  analyzer = audioCtx.createAnalyser();
  const source = audioCtx.createMediaStreamSource(stream); // pipe our stream thru audioCtx
  source.connect(analyzer);
  // how much data do we wanna collect
  analyzer.fftSize = 2 ** 9; // to the power of
  // pull data off the audio
  // how many pieces of data there are 
  bufferLength = analyzer.frequencyBinCount;
  const timeData = new Uint8Array(bufferLength);
  const frequencyData = new Uint8Array(bufferLength);
  drawTimeData(timeData);
  drawFrequencyData(frequencyData);
}

function drawTimeData(timeData) {
  // inject the time data into the timeData array
  analyzer.getByteTimeDomainData(timeData);
  // now that we have the time, turn into something visual
  // TODO clear the canvas
  ctx.clearRect(0,0, WIDTH, HEIGHT);
  // setup some canvas drawing
  ctx.lineWidth = 10;
  ctx.strokeStyle = 'mediumspringgreen';
  ctx.beginPath();
  // whats the width of each line of data going to be
  const sliceWidth = WIDTH / bufferLength;
  let x = 0;
  timeData.forEach((data, i) => {
    const v = data / 128; // when you say nothing the value is 128, so we'll use this as our mulitplier 
    const y = (v * HEIGHT) / 2;
    // draw our lines
    if(i===0) {
      ctx.moveTo(x,y);
    } else {
      ctx.lineTo(x,y);
    }
    x += sliceWidth;
  });
  ctx.stroke();
  // call itself as soon as possible
  requestAnimationFrame(() => drawTimeData(timeData)); // draw to the page whenever you can
}

function drawFrequencyData(frequencyData) {
  // get the frequency data into our array
  analyzer.getByteFrequencyData(frequencyData);
  // figure out the bar width
  const barWidth = (WIDTH / bufferLength) * 2.5;
  let x = 0;
  frequencyData.forEach(amount => {
    // amount comes in from 1 to 255, need to figure out height
    const percent = amount / 255;
    const [h,s,l] = [360 / (percent * 360) - 0.5, 0.8, 0.5];
    const barHeight = (HEIGHT * percent) / 2;
    // TODO convert the color to hsl
    const [r,b,g] = hslToRgb(h,s,l);
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
    x += barWidth + 5;
  });

  requestAnimationFrame(() => drawFrequencyData(frequencyData));
}

getAudio();