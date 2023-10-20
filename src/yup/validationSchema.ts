import {MAX_COST_PROPERTY, MAX_PERIOD_CREDIT, MIN_PERIOD_CREDIT} from "../constant.ts";
import { parseCurrencyToNumber } from "../utils/utils.ts";
import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  propertyCost: Yup.number()
    .min(0, "Стоимость недвижимости должна быть больше нуля")
    .max(
      MAX_COST_PROPERTY,
      "Стоимость недвижимости не может превышать 10,000,000",
    )
    .required("Введите значение"),
  purchaseCity: Yup.string().required("Выберите ответ"),
  timeRegistration: Yup.string().required("Выберите ответ"),
  initialPayment: Yup.number()
    .min(0, "Стоимость недвижимости должна быть больше нуля")
    .test(
      "no-more",
      "Сумма первоначального взноса не может быть меньше 25% от стоимости недвижимости",
      function (value: number | undefined) {
        if (value) {
          const minimumInitialPaymentPercentage = 0.25;
          const propertyCost = this.parent.propertyCost;
          return value >= minimumInitialPaymentPercentage * propertyCost;
        }
      },
    )
    .required("Выберите ответ"),
  propertyType: Yup.string().required("Выберите ответ"),
  propertyOwn: Yup.string().required("Выберите ответ"),
  period: Yup.number()
    .min(MIN_PERIOD_CREDIT, "Cрок ипотеки не может быть меньше 4")
    .max(MAX_PERIOD_CREDIT, "Cрок ипотеки не может превышать 30 лет")
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
