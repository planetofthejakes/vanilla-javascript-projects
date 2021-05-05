import {init} from './init.js';

// start the app on mouse enter
const app = document.querySelector('.app');

app.addEventListener('mouseenter', init, {once:true});