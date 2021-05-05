// utility function. takes in array above and something that the return should not be
export function randomItemFromArray(array, not) {
  const item = array[Math.floor(Math.random() * array.length)];
  // recursion here. if this function returns the same item as it was before, run again 
  if (item === not) {
    console.log('ah we used this last time, look again');
    return randomItemFromArray(array, not);
  }
  return item;
}