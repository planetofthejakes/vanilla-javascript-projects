/* eslint-disable func-names */
// listen when someone types into the input and hits submit
// keep track of all shopping lists items and whether they're complete
// render out a list of all of those items
// create a custom event so we can keep our concerns separate and not too tightly tie functions together
// store items in local storage

const shoppingForm = document.querySelector('.shopping');
const shoppingList = document.querySelector('.list');

// need an array to hold our items & state
let items = [];

// listen for submit event on the form
function handleSubmit(e) {
  e.preventDefault();
  const name = e.currentTarget.item.value;
  // stop function from running if input is empty
  if(!name) return;
  // 
  const item = {
    name,
    id: Date.now(),
    complete: false,
  };
  // push the items into our state
  items.push(item);
  console.log(`there are now ${items.length} in your state`);
  // clear the form
  // e.currentTarget.item.value = '';
  e.target.reset();
  // displayItems();
  // fire off a custom event that will tell anyone who cares that the items have been updated
  shoppingList.dispatchEvent(new CustomEvent('itemsUpdated'));
}

// display the items
function displayItems() {
  console.log(items);
  const html = items
    .map
      (item => 
        `<li class="shopping-item">
        <input 
          value="${item.id}"
          type="checkbox"
          ${item.complete ? 'checked' : ''}  
        >
        <span class="itemName">${item.name}</span>
        <button 
          aria-label="Remove ${item.name}"
          value=${item.id};
        >&times;</button>
  </li>`).join('');
  shoppingList.innerHTML = html;
}

function mirrorToLocalStorage() {
  // listen for even and mirror items to local storage
  console.info('saving items to local storage');
  // convert the object to a string through json
  localStorage.setItem('items', JSON.stringify(items));
}

function restoreFromLocalStorage() {
  console.info('resoring from local storage');
  // pull items from local storage
  const lsItems = JSON.parse(localStorage.getItem('items'));
  if (lsItems.length) {
    // push takes unlimited arguments so we can spread them from in from localStorage
    items.push(...lsItems);
    shoppingList.dispatchEvent(new CustomEvent('itemsUpdated'));
  }
}

function deleteItem(id) {
  console.log('deleting item', id);
  // update items array without this one
  items = items.filter(item => item.id !== id);
  // fire off another custom event to render new list without deleted item
  shoppingList.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function markAsComplete(id) {
  console.log('marking as complete', id);
  // find the id
  const itemRef = items.find(item => item.id === id);
  // we could do a if statement but we'll just set to the opposite of itself for checked
  itemRef.complete = !itemRef.complete;
  shoppingList.dispatchEvent(new CustomEvent('itemsUpdated'));
}

shoppingForm.addEventListener('submit', handleSubmit);
shoppingList.addEventListener('itemsUpdated', displayItems);
shoppingList.addEventListener('itemsUpdated', mirrorToLocalStorage);
// event delegation
// listen for the click on the list ul but then delegate the click to the button if that is what was clicked
shoppingList.addEventListener('click', function(e) {
  const id = parseInt(e.target.value);
  if(e.target.matches('button')) {
    deleteItem(id);  
  }
  if(e.target.matches('input[type="checkbox"]')) {
    markAsComplete(id);
  }
});

restoreFromLocalStorage();