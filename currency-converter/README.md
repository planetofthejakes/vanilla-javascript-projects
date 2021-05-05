# Currency Converter

Slick lil' app that fetches real time currency values which you can then convert into whatever other currency you'd like. 

We utilize a caching method here in order to limit our number of API requests, so if a currency has already been fetched then we store that in an object. We also use a number formatter to provide the correct currency symbol.  

Update: we've refactored everything from just a scripts.js file into modules. 

💸