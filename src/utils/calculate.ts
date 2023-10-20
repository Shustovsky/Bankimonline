export const calculateMonthPayment = (
  propertyCost: number,
  period: number,
): number => {
  const MONTH_IN_YEAR = 12;
  const paymentInYear = propertyCost / period;
  const paymentInMonth = paymentInYear / MONTH_IN_YEAR;
  const ceilPayment = Math.ceil(paymentInMonth);
  return ceilPayment;
};
