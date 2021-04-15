const tabs = document.querySelector('.tabs');
const tabButtons = tabs.querySelectorAll('[role="tab"]');
const tabPanels = Array.from(tabs.querySelectorAll('[role="tabpanel"]'));

function handleTabClick(e) {
  // hide all tab panels
  tabPanels.forEach(panel => {
    panel.hidden = true;
  });
  // mark tabs as unselected
  tabButtons.forEach(tab => {
    tab.setAttribute('aria-selected', false);
  });
  // mark 'this' tab as selected
  // reach for attributes instead if we can rather than setting classes
  e.currentTarget.setAttribute('aria-selected', true);
  // find associated tabPanel and show
  const {id} = e.currentTarget;

  // Method 1
  // const tabPanel = tabs.querySelector(`[aria-labelledby="${id}"]`);
  // tabPanel.hidden = false;

  // Method 2 - find in the arry of tabPanels
  // implicit return of an if statement, store in variable and then update hidden attribute
  const tabPanel = tabPanels.find(panel => panel.getAttribute('aria-labelledby') === id);
  console.log(tabPanel);
  tabPanel.hidden = false;
}

tabButtons.forEach(button => button.addEventListener('click', handleTabClick));