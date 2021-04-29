/* eslint-disable func-names */
function Gallery(gallery) {
  if(!gallery) {
    throw new Error('no gallery found');
  }
  this.gallery = gallery; // save reference to the gallery to use later in the prototype 
  // gonna create scope for these variables through a closure so we can reuse this code for multiple galleries and they won't clash with each other
  // select the elements we need
  this.images = Array.from(gallery.querySelectorAll('img'));
  this.modal = document.querySelector('.modal');
  this.prevButton = this.modal.querySelector('.prev');
  this.nextButton = this.modal.querySelector('.next');

  // bind out methods to the instance when we need them
  // hold on to our functions here so we can always remove them in the future
  this.showNextImage = this.showNextImage.bind(this);
  this.showPrevImage = this.showPrevImage.bind(this);
  this.handleKeyUp = this.handleKeyUp.bind(this);
  this.handleClickOutside = this.handleClickOutside.bind(this);

  // event listeners
  this.images.forEach(image => image.addEventListener('click', (e) => this.showImage(e.currentTarget)));

  // accessibility listener for people who use tab: attach even listener for each image
  this.images.forEach(image => {
    image.addEventListener('keyup', e => {
    // when that is keyup check if it was enter
    if(e.keyup === 'Enter') {
      // if it was then show that image
      this.showImage(e.currentTarget);
      }
    });
  });

  this.modal.addEventListener('click', this.handleClickOutside);

}

// pop open the modal
Gallery.prototype.openModal = function() {
  // check if modal is already open because of the animations
  if (this.modal.matches('.open')) {
    console.info('modal already open');
    return;
  }
  this.modal.classList.add('open');

  // event listeners to be bound when we open the modal
  window.addEventListener('keyup', this.handleKeyUp);
  this.nextButton.addEventListener('click', this.showNextImage);
  this.prevButton.addEventListener('click', this.showPrevImage);
}

// close modal
Gallery.prototype.closeModal = function() {
  this.modal.classList.remove('open');
  // add event listeners for clicks and keyboard
  // only listen for keyup and click once and cleanup the event listeners
  window.removeEventListener('keyup', this.handleKeyUp);
  this.nextButton.removeEventListener('click', this.showNextImage);
  this.prevButton.removeEventListener('click', this.showPrevImage);
}

Gallery.prototype.handleClickOutside = function(e) {
  // if what someone clicks is exactly the same as what we're listening for, then close
  if (e.target === e.currentTarget) {
    this.closeModal();
  }
}

// eslint-disable-next-line consistent-return
Gallery.prototype.handleKeyUp = function(e) {
  // add return to these even tho we don't need them to escape the function and not have them all unneccessarily run 
  if (e.key === 'Escape') return this.closeModal();
  // piggyback off this listener and function to add the arrow capabilities
  if (e.key === 'ArrowRight') return this.showNextImage();
  if (e.key === 'ArrowLeft') return this.showPrevImage();
}

Gallery.prototype.showNextImage = function() {
  this.showImage(this.currentImage.nextElementSibling || this.gallery.firstElementChild);
}

Gallery.prototype.showPrevImage = function() {
  this.showImage(this.currentImage.previousElementSibling || this.gallery.lastElementChild);
}

// update the modal with the associated image 
Gallery.prototype.showImage = function(el) {
  if (!el) {
    console.info('no image to show');
  }
  // update image src, header, paragraph 
  this.modal.querySelector('img').src = el.src;
  this.modal.querySelector('h2').textContent = el.title;
  this.modal.querySelector('figure p').textContent = el.dataset.description;
  this.currentImage = el; // set the current image on the instance
  this.openModal();
}

// User it on the page
const gallery1 = new Gallery(document.querySelector('.gallery1'));
const gallery2 = new Gallery(document.querySelector('.gallery2'));

console.log(gallery1, gallery2);