const jokeButton = document.querySelector('.getJoke');
const jokeButtonSpan = document.querySelector('.jokeText');
const jokeHolder = document.querySelector('.joke p');
const loader = document.querySelector('.loader');
const buttonText = [
  'Ugh.',
  '🤦🏻‍♂️',
  'omg dad.',
  'you are the worst',
  'seriously',
  'stop it.',
  'please stop',
  'that was the worst one',
];

async function fetchJoke() {
  // turn loader on
  loader.classList.remove('hidden');
  const res = await fetch(`https://icanhazdadjoke.com/`, {
    headers: {
      Accept: 'application/json',
    },
  });
  const data = await res.json();
  // turn loader off
  loader.classList.add('hidden');
  return data;
}

// utility function. takes in array above and something that the return should not be
function randomItemFromArray(array, not) {
  const item = array[Math.floor(Math.random() * array.length)];
  // recursion here. if this function returns the same item as it was before, run again 
  if(item === not) {
    console.log('ah we used this last time, look again');
    return randomItemFromArray(array, not);
  }
  return item;
}

async function handleClick() {
  const {joke} = await fetchJoke();
  jokeHolder.textContent = joke;
  jokeButtonSpan.textContent = randomItemFromArray(buttonText, jokeButtonSpan.textContent); // whatever the button currently says, don't return that one to me
}

jokeButton.addEventListener('click', handleClick);
