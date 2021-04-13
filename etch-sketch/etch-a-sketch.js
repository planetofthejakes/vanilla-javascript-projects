// select the elements on the page - canvas, shake button
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakeButton = document.querySelector('.shake');
const MOVE_AMOUNT = 50; // when there is a true constant and it will never change, then we break the variable name rule

// setup the canvas for drawing
const { width, height } = canvas; // destructing variables from the properties of canvas object

// create random x and y starting points on the canvas
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineJoin = 'round';
ctx.lineCap = 'round'; // ensures we get a smooth drawing
ctx.lineWidth = MOVE_AMOUNT; // sets the pixel size 

let hue = 0; // gonna change the color of the stroke
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

ctx.beginPath(); // start the drawing
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke(); // draw a line to and from

// write a draw function
// destructure the parameter object of options we pass in, and just name that to the variable key for better naming purposes
function draw({ key }) {
  hue += 10;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`; // change color of stroke
  console.log(key);
  ctx.beginPath();
  ctx.moveTo(x, y);
  // move x and y values depending on what user pressed
  switch (key) {
    case 'ArrowUp':
      y -= MOVE_AMOUNT;
      break; // stop the switch from running, have to write
    case 'ArrowRight':
      x += MOVE_AMOUNT;
      break;
    case 'ArrowDown':
      y += MOVE_AMOUNT;
      break;
    case 'ArrowLeft':
      x -= MOVE_AMOUNT;
      break;
    default:
      break;
  }
  ctx.lineTo(x, y); // move to the new x and y values
  ctx.stroke(); // draw the line between move and line
}

// write a handler for the keys
function handleKey(e) {
  if (e.key.includes('Arrow')) {
    // e.preventDefault();
    draw({ key: e.key }); // draw function, passing in the e.key from the options object of the key event
  }
}

// clear or shake function
function clearCanvas() {
  canvas.classList.add('shake');
  ctx.clearRect(0, 0, width, height); // clears the canvas
  canvas.addEventListener(
    'animationend',
    function() {
      console.log('done the shake');
      canvas.classList.remove('shake');
    },
    { once: true }, // addEventListener will unbind itself when you pass a third object to the eventListener. now it will just run once instead of adding an eventListener every time
  );
}

// listen for arrow keys
window.addEventListener('keydown', handleKey);
shakeButton.addEventListener('click', clearCanvas);
