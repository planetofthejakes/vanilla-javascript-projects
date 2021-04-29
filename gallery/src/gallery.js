function Gallery(gallery) {
  if(!gallery) {
    throw new Error('no gallery found');
  }
  // gonna create scope for these variables through a closure so we can reuse this code for multiple galleries and they won't clash with each other
  // select the elements we need
  const images = Array.from(gallery.querySelectorAll('img'));
  const modal = document.querySelector('.modal');
  const prevButton = modal.querySelector('.prev');
  const nextButton = modal.querySelector('.next');
  let currentImage;

  // pop open the modal
  function openModal() {
    // check if modal is already open because of the animations
    if(modal.matches('.open')) {
      console.info('modal already open');
      return;
    }
    modal.classList.add('open');

    // event listeners to be bound when we open the modal
    window.addEventListener('keyup', handleKeyUp);
    nextButton.addEventListener('click', showNextImage);
    prevButton.addEventListener('click', showPrevImage);
  }

  // close modal
  function closeModal() {
    modal.classList.remove('open');
    // add event listeners for clicks and keyboard
    // only listen for keyup and click once and cleanup the event listeners
    window.removeEventListener('keyup', handleKeyUp);
    nextButton.removeEventListener('click', showNextImage);
    prevButton.removeEventListener('click', showPrevImage);
  }

  function handleClickOutside(e) {
    // if what someone clicks is exactly the same as what we're listening for, then close
    if(e.target === e.currentTarget) {
      closeModal();
    }
  }

  function handleKeyUp(e) {
    // add return to these even tho we don't need them to escape the function and not have them all unneccessarily run 
    if(e.key === 'Escape') return closeModal();
    // piggyback off this listener and function to add the arrow capabilities
    if(e.key === 'ArrowRight') return showNextImage();
    if(e.key === 'ArrowLeft') return showPrevImage();
  }

  function showNextImage() {
    showImage(currentImage.nextElementSibling || gallery.firstElementChild);
  }

  function showPrevImage() {
    showImage(currentImage.previousElementSibling || gallery.lastElementChild);
  }

  // update the modal with the associated image 
  function showImage(el) {
    if(!el) {
      console.info('no image to show'); 
    }
    // update image src, header, paragraph 
    modal.querySelector('img').src = el.src;
    modal.querySelector('h2').textContent = el.title;
    modal.querySelector('figure p').textContent = el.dataset.description;
    currentImage = el; // set current image when modal opens so we can use prev next buttons 
    openModal();
  }

  // event listeners
  images.forEach(image => image.addEventListener('click', (e) => showImage(e.currentTarget)));
  modal.addEventListener('click', handleClickOutside);
  // accessibility listener for people who use tab: attach even listener for each image
  images.forEach(image => (e) => {
    // when that is keyup check if it was enter
    if(e.keyup === 'Enter') {
      // if it was then show that image
      showImage(e.currentTarget);
    }
  })

}

// User it on the page
const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));