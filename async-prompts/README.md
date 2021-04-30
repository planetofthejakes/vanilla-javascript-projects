# Async Prompts

Deep dive working with async await. We create a much more flexible prompt box on the page compared to the standard prompt which lives on the window. 

Additionally, we create a utility asyn mapping function which can take in an array of data and run the callback sequentially, pausing before the next is loaded using a for of loop rather than having all of them popping up at once in the UI. Prettttty handy. 

🦫