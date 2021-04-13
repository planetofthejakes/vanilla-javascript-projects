const cardButtons = document.querySelectorAll('.card button');
const modalOuter = document.querySelector('.modal-outer');
const modalInner = document.querySelector('.modal-inner');

function handleCardButtonClick(event) {
  const button = event.currentTarget;
  const card = button.closest('.card'); // closest is like query selector, its just nice to use and we can see it grab the cloeset element easily
  // grab the img source
  const imgSrc = card.querySelector('img').src;
  // grab the data description attirbute to display later
  const desc = card.dataset.description;
  const name = card.querySelector('h2').textContent;
  // populate modal with new info
  modalInner.innerHTML = `
    <img src="${imgSrc.replace('200', '600')}" alt="${name}">
    <p>${desc}</p>
  `;
  // show the modal
  modalOuter.classList.add('open');
}

// loop over each button to listen for click
cardButtons.forEach(button =>
  button.addEventListener('click', handleCardButtonClick),
);

function closeModal() {
  modalOuter.classList.remove('open');
}

// click outside listener
modalOuter.addEventListener('click', event=> {
  // create a variable to check and see if click is outside
  // we must add target to hone in on where we're clicking
  // add a bang for boolean and write if statement
  const isOutside = !event.target.closest('.modal-inner');
  // create if statement to see when click is outside
  if (isOutside) {
    closeModal();
  }
});

// close modal on keydown of escape key
window.addEventListener('keydown', event=> {
  // just event.key, no target here since we're just listening for a key to be pressed down
  if (event.key === 'Escape') {
    closeModal();
  }
});
