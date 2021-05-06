import { handleResult } from './handlers';
import { colorsByLength, isDark } from './colors'

const colorsEl = document.querySelector('.colors');

function displayColors(colors) {
  return colors.map(color =>
    `<span class="color ${color} ${isDark(color) ? 'dark' : ''}" 
    style="background: ${color};">${color}</span>`,
  ).join('');
}

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecongnition;

function start() {
  // see if the browser supports this
  if (!('SpeechRecognition' in window)) {
    console.log('whoops, sorry your browser does not support speech reco');
    return;
  }
  // it does work
  console.log('starting...');
  const recognition = new webkitSpeechRecognition(); // had to revert to prefix here,, wasn't working with just SpeechRecognition
  recognition.continuous = true; // always listening to your speech
  recognition.interimResults = true; // gives results as you are speaking
  recognition.onresult = handleResult; // this is our event listener
  recognition.start();
}

start();
colorsEl.innerHTML = displayColors(colorsByLength);