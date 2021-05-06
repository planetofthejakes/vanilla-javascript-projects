import { isValidColor } from './colors';

// eslint-disable-next-line import/prefer-default-export
export function handleResult({ results }) {
  const words = results[results.length - 1][0].transcript;
  // lowercase everything
  let color = words.toLowerCase();
  // strip spaces out
  color = color.replace(/\s/g, ''); 
  // check if it is a valid color
  if(!isValidColor(color)) return; // that's all folks
  console.log('this is a valid color');
  // if it is, then show the UI for that
  const colorSpan = document.querySelector(`.${color}`);
  console.log(colorSpan);
  colorSpan.classList.add('got');
  // change the background color
  document.body.style.backgroundColor = color;
}