export async function convertUSDToGBP(usd: number) {
  const endpoint = `https://api.currencyapi.com/v3/latest?apikey=${process.env.CURRENCY_API_KEY}&currencies=USD&base_currency=GBP`;
  const response = await fetch(endpoint);
  const data = await response.json();
  const { USD } = data.data;
  const gbpInUsd = USD.value;
  const gbp = usd / gbpInUsd;

  return gbp;
}
