/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
function wait(ms =0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function destroyPopup(popup) {
  popup.classList.remove('open');
  await wait(1000); // wait for thing to fade out from dom 
  // remove popup entirely from dom
  popup.remove();
  // eslint-disable-next-line no-param-reassign
  popup = null; // delete it forever so we don't have a memory leak
}

function ask(options) {
  return new Promise(async function(resolve) {
    // first we need to create a popup with all the fields
    const popup = document.createElement('form');
    popup.classList.add('popup');
    popup.insertAdjacentHTML('afterbegin', 
      `<fieldset>
        <label>${options.title}</label>
        <input type="text" name="input"/>
        <button type="submit">Submit</button>
      </fieldset>
    `)

    // check if they want a cancel button
    if(options.cancel) {
      const skipButton = document.createElement('button');
      skipButton.type = 'button';
      skipButton.textContent = 'Cancel';
      // add the cancel button to the dom
      popup.firstElementChild.appendChild(skipButton);
      // TODO: listen for a click on the cancel button
      skipButton.addEventListener('click', function() {
        resolve(null); // explicitely resolve with nothing
        destroyPopup(popup);
      }, {once: true});
    }

    // listen for the submit event on the inputs 
    popup.addEventListener('submit', function(e) {
        e.preventDefault();
        // resolve the input value passed in
        resolve(e.target.input.value);  
        // remove it from the dom entirely 
        destroyPopup(popup);
      }, { once: true }); // only listen for the event once, passed as 3rd argument 

    // when someone does sumbit, resolve the data that was passed thru inputs

    // insert the popup into the dom
    document.body.appendChild(popup);
    // put a very small timeout before we add the open class 
    await wait(50);
    popup.classList.add('open');
  });
}

// select all buttons that have a question
async function askQuestion(e) {
  const button = e.currentTarget;
  // how we detect if a cancel a property exists in dataset
  // one way: const cancel = 'cancel' in button.dataset;
  const cancel = button.hasAttribute('data-cancel');
  console.log(cancel);
  const answer = await ask({
    title: button.dataset.question, 
    cancel,
  });
  console.log(answer);
}

const buttons = document.querySelectorAll('[data-question]');
buttons.forEach(button => button.addEventListener('click', askQuestion));

// how to ask someone a series of questions
const questions = [
  {title: 'What is your name?'},
  {title: 'What is your age?', cancel: true},
  {title: 'What is your dogs name?'},
];

// loop over the array and return a promise from each one
// if you use Promise.all with map or a async await with a forEach, it'll work but you'll get them in a weird order and they'll all pop up at once. instead we'll use a for of loop, since for of will pause the loop before continuing 
// utility function for this below
async function asyncMap(array, callback) {
  // make array to store results
  const results = [];
  for(const item of array) {
    const result = await callback(item);
    results.push(result);
  }
  // when we're done with loop, return
  return results;
}

async function go() {
  const answers = await asyncMap(questions, ask);
  console.log(answers);
}

go();

// async function askMany() {
//   for(const question of questions) {
//     const answer = await ask(question);
//     console.log(answer);
//   }
// }

// askMany();
