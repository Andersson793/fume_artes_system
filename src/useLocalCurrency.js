export function useLocalCurrency(currency) {
  let NewCurrency = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(currency);

  return NewCurrency;
}
