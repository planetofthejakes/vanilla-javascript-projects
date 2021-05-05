export async function fetchJoke(loader) {
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