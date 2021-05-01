/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
function wait(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Pure function return the same value every time, natrually Math.random() is *not* a pure function
// instead we'll pass it thru as an argument to make this function pure and testable if we want to set the randomNumber
function getRandomBetween(min = 20, max = 150, randomNumber = Math.random()) {
  return Math.floor(randomNumber * (max - min) + min);
}

// // async for of loop example 
// async function draw(el) {
//   const text = el.textContent;
//   let soFar = '';
//   for(const letter of text) {
//     soFar += letter;
//     el.textContent = soFar;
//     // wait for some amount of time
//     const {typeMin, typeMax}= el.dataset;
//     const amountOfTimeToWait = getRandomBetween(typeMin, typeMax);
//     await wait(amountOfTimeToWait);
//   }
// }

// recursion example
function draw(el) {
  // keep an index that will be increased once every single time
  let index = 1;
  const text = el.textContent;
  const { typeMin, typeMax } = el.dataset;
  async function drawLetter() {
    el.textContent = text.slice(0, index);
    index +=1; 
    // calculate the random number for every letter 
    const amountOfTimeToWait = getRandomBetween(typeMin, typeMax);
    await wait(amountOfTimeToWait);
    // exit condition
    if(index <= text.length) {
      drawLetter(); // this is the recursion 
      // wait for some time
    }
  }
  // when this function draw() runs, kick off drawletter()
  drawLetter();
}

// really shorthand instead of creating a variable and then looping thru an arrowFn 
// loop over our data-types and on each do our draw function
document.querySelectorAll('[data-type]').forEach(draw);

