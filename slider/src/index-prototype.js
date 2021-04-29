/* eslint-disable func-names */
function Slider(slider) {
  // we can check if the value passed in is actually an element and not a number, etc. 
  if(!(slider instanceof Element)) {
    throw new Error('no slider pass in');
  }
  this.slider = slider; // store reference to the instance of slider 
  // select the elements needed for the slider
  this.slides = slider.querySelector('.slides');
  // we don't need the following variables outside the constructor, so no need to add 'this'
  const prevButton = slider.querySelector('.goToPrev');
  const nextButton = slider.querySelector('.goToNext');

  // when this sliider is created, run the start slider functon and apply classes
  this.startSlider();
  this.applyClasses();

  // event listeners
  prevButton.addEventListener('click', () => this.move('back'));
  nextButton.addEventListener('click', () => this.move());
}

Slider.prototype.startSlider = function() {
  this.current = this.slider.querySelector('.current') || this.slides.firstElementChild;
  this.prev = this.current.previousElementSibling || this.slides.lastElementChild;
  this.next = this.current.nextElementSibling || this.slides.firstElementChild;
}

Slider.prototype.applyClasses = function() {
  this.current.classList.add('current');
  this.prev.classList.add('prev');
  this.next.classList.add('next');
}

Slider.prototype.move = function(direction) {
  // first strip all the classes off the current slides
  const classesToRemove = ['prev', 'current', 'next'];
  this.prev.classList.remove(...classesToRemove);
  this.current.classList.remove(...classesToRemove);
  this.next.classList.remove(...classesToRemove);
  if (direction === 'back') {
    // reassigning variables to each other causes problems and makes you want to become a farmer
    // make a new array of the new values and destructure them over and into the prev, current, next variables
    [this.prev, this.current, this.next] = [this.prev.previousElementSibling || this.slides.lastElementChild, this.prev, this.current]
  } else {
    [this.prev, this.current, this.next] = [this.current, this.next, this.next.nextElementSibling || this.slides.firstElementChild];
  }
  this.applyClasses();
}

const mySlider = new Slider(document.querySelector('.slider'));
const dogSlider = new Slider(document.querySelector('.dog-slider'));

console.log(mySlider, dogSlider);

// example below on how we can add functionality outside of the prototype constructor on the window
window.dogSlider = dogSlider;

window.addEventListener('keyup', function(e) {
  if(e.key === 'ArrowRight') {
    dogSlider.move();
  } 
  if (e.key === 'ArrowLeft') 
    dogSlider.move('back');
});