export function parseCurrencyToNumber(value: number | string): number {
  const valueWithoutCommas = value.toString().replace(/,/g, "");
  return Number(valueWithoutCommas);
}
