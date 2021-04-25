const video = document.querySelector('.webcam');
const canvas = document.querySelector('.video');
const ctx = canvas.getContext('2d');
const faceCanvas = document.querySelector('.face');
const faceCtx = faceCanvas.getContext('2d');
const faceDetector = new window.FaceDetector();
const optionsInputs = document.querySelectorAll('.controls input[type="range"]');
console.log(optionsInputs);

const options = {
  SIZE: 10,
  SCALE: 1.35,
}

function handleOption(e) {
  const {value, name} = e.currentTarget;
  options[name] = parseFloat(value);
}

optionsInputs.forEach(input => input.addEventListener('input', handleOption));

// populate the persons video
async function populateVideo() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { width: 1280, height: 720},
  });
  // put the stream into the video
  video.srcObject = stream;
  await video.play();
  // dynamically set the video dimensions from the person
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  faceCanvas.width = video.videoWidth;
  faceCanvas.height = video.videoHeight;
}

// detect the persons face
async function detect() {
  const faces = await faceDetector.detect(video);
  faces.forEach(drawFace);
  faces.forEach(censor);
  // instead of setting our own interval we'll ask the browser when the next animation frame is and run detect for us
  requestAnimationFrame(detect);
}

// draw the area of the persons face
function drawFace(face) {
  const {width, height, top, left} = face.boundingBox;
  // clear the rectangle after every animation frame
  ctx.clearRect(0,0, canvas.width, canvas.height);
  ctx.strokeStyle = 'goldenrod';
  ctx.lineWidth = 2;
  // draw the rectangle on the persons face
  ctx.strokeRect(left, top, width, height);
}

// pixelate the persons face 
function censor({boundingBox: face}) {
  faceCtx.imageSmoothingEnabled = false;
  faceCtx.clearRect(0, 0, faceCanvas.width, faceCanvas.height);
  // draw the small face
  faceCtx.drawImage(
    // 5 src args
    video, // source
    face.x, // where do we start the source pull from
    face.y, 
    face.width,
    face.height,
    // 4 draw args
    face.x, // where should we start drawing the x and y
    face.y,
    options.SIZE,
    options.SIZE,
  );
  const width = face.width * options.SCALE;
  const height = face.height * options.SCALE;
  // draw the small face back on, but scale up
  faceCtx.drawImage(
    faceCanvas, // source
    face.x, // where do we start the source pull from
    face.y, 
    options.SIZE,
    options.SIZE,
    // drawing args
    face.x - (width - face.width) / 2,
    face.y - (height - face.height) / 2,
    width,
    height,
  );
}

populateVideo().then(detect);