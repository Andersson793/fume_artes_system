export function useLocalCurrency(currency) {
  let formated = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(currency);

  return formated;
}
