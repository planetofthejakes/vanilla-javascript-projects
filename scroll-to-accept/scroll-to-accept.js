// if we're only running this javascript on this page of a larger site we'd throw this all in a function 
// in the function we'd check if there are terms, and if not just return from function, otherwise run everything
// call the function on page load

const terms = document.querySelector('.terms-and-conditions');
const button = document.querySelector('.accept');

function obCallback(payload) {
  if(payload[0].intersectionRatio === 1) {
    button.disabled = false;
    // stop observing the button
    ob.unobserve(terms.lastElementChild);
  };
}

// create an intersection observer
// pass an object as second argument to have function only trigger when element is completely on screen
const ob = new IntersectionObserver(obCallback, {
  root: terms,
  threshold: 1,
});

// call observe method on the IB to trigger the callback
// we want to find the last element in the terms to initiate the button
ob.observe(terms.lastElementChild);