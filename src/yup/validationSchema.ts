import { parseCurrencyToNumber } from "../utils/utils.tsx";
import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  propertyCost: Yup.string()
    .test(
      "is-positive",
      "Стоимость недвижимости должна быть больше нуля",
      (value: string | undefined) => {
        if (value) {
          const numericValue = parseCurrencyToNumber(value);
          return numericValue > 0;
        }
      },
    )
    .test(
      "is-negative",
      "Стоимость недвижимости не может превышать 10,000,000",
      (value: string | undefined) => {
        const MAX_COAST_CURRENCY = 10000000;
        if (value) {
          const numericValue = parseCurrencyToNumber(value);
          return numericValue <= MAX_COAST_CURRENCY;
        }
      },
    )
    .required("Введите значение"),
  purchaseCity: Yup.string().required("Выберите ответ"),
  timeRegistration: Yup.string().required("Выберите ответ"),
  initialPayment: Yup.string()
    .test(
      "no-more",
      "Сумма первоначального взноса не может быть меньше 25% от стоимости недвижимости",
      function (value: string | undefined) {
        const minimumInitialPaymentPercentage = 0.25;
        if (value) {
          const numericValue = parseCurrencyToNumber(value);
          const propertyCost = parseCurrencyToNumber(this.parent.propertyCost);
          return numericValue >= minimumInitialPaymentPercentage * propertyCost;
        }
      },
    )
    .required("Выберите ответ"),
  propertyType: Yup.string().required("Выберите ответ"),
  propertyOwn: Yup.string().required("Выберите ответ"),
  period: Yup.string()
    .test(
      "no-more-time",
      "Cрок ипотеки не может превышать 30 лет",
      function (value: string | undefined) {
        const MAX_CREDIT_YEARS = 30;
        if (value) {
          const numericValue = parseCurrencyToNumber(value);
          return numericValue <= MAX_CREDIT_YEARS;
        }
      },
    )
    .test(
      "more-than-zero",
      "Cрок ипотеки не может быть меньше 4",
      function (value: string | undefined) {
        const MIN_CREDIT_YEARS = 4;
        if (value) {
          const numericValue = parseCurrencyToNumber(value);
          return numericValue >= MIN_CREDIT_YEARS;
        }
      },
    )
    .required("Выберите ответ"),
  monthlyPayment: Yup.string()
    .test(
      "is-minimum-value",
      "Не может быть меньше минимального значения",
      function (value: string | undefined) {
        const MIN_VALUE = 2654;
        if (value) {
          const numericValue = parseCurrencyToNumber(value);
          return numericValue >= MIN_VALUE;
        }
      },
    )
    .test(
      "is-maximum-value",
      "Не может быть больше максимального значения",
      function (value: string | undefined) {
        if (value) {
          const MAX_VALUE = 51130;
          const numericValue = parseCurrencyToNumber(value);
          return numericValue <= MAX_VALUE;
        }
      },
    )
    .required("Выберите ответ"),
});
