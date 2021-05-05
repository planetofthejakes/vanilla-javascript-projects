import { fromSelect, toSelect } from './elements.js';
import { generateOptions } from './utils.js';
import currencies from './currencies.js';
import handleInput from './handlers.js';

export function init() {
  // when the page load this code runs! 
  const form = document.querySelector('.app form');

  const optionsHTML = generateOptions(currencies);
  // populuate the options elements
  fromSelect.innerHTML = optionsHTML;
  toSelect.innerHTML = optionsHTML;

  // lil trick: we can listen for input on a form to cover all inputs inside that form
  form.addEventListener('input', handleInput);
}

export default init;