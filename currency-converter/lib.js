const endPoint = 'https://api.ratesapi.io/api/latest';
// this is going to store all of the rates in it so we don't have to keep fetching
const ratesByBase = {};

export async function fetchRates(base = 'USD') {
  const res = await fetch(`${endPoint}?base=${base}`);
  const rates = await res.json();
  return rates;
}

export async function convert(amount, from, to) {
  // first check if we have the rates to convert from that currency
  if (!ratesByBase[from]) {
    console.log(`oh no we don't have ${from} to convert to ${to} so let's go get it`);
    const rates = await fetchRates(from);
    console.log(rates);
    // store them for next time
    ratesByBase[from] = rates;
  }
  // convert the amount they passed in
  const rate = ratesByBase[from].rates[to];
  const convertedAmount = rate * amount;
  return convertedAmount;
}

