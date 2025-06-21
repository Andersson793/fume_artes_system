export function localCurrency(currency) {
  let NewCurrency = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(currency);

  return NewCurrency;
}
