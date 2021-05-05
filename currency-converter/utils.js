export function generateOptions(options) {
  return Object.entries(options)
    .map(
      ([currencyCode, currencyName]) =>
        `<option value="${currencyCode}">${currencyCode} - ${currencyName}</option>`,
    ).join('');
}

export function formatCurrency(amount, currency) {
  // this is called a formatter, this one is required to pass the locale 
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}