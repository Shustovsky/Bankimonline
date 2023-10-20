import * as Yup from 'yup';
import {parseCurrencyToNumber} from "../utils/utils.tsx";

export const validationSchema = Yup.object().shape({
  propertyCost: Yup.string()
    .test('is-positive', 'Стоимость недвижимости должна быть больше нуля', (value: string | undefined) => {
      if (value) {
        const numericValue = parseCurrencyToNumber(value);
        return numericValue > 0;
      }
    })
    .test('is-negative', 'Стоимость недвижимости не может превышать 10,000,000', (value: string | undefined) => {
      if (value) {
        const numericValue = parseCurrencyToNumber(value);
        return numericValue < 10000000;
      }
    })
    .required('Введите значение'),
  purchaseCity: Yup.string().required('Выберите ответ'),
  timeRegistration: Yup.string().required('Выберите ответ'),
  initialPayment: Yup.string()
    .test('no-more', 'Сумма первоначального взноса не может быть меньше 25% от стоимости недвижимости', function (value: string | undefined) {
      if (value) {
        const numericValue = parseCurrencyToNumber(value);
        const propertyCost = parseCurrencyToNumber(this.parent.propertyCost);
        return numericValue >= 0.25 * propertyCost;
      }
    })
    .required('Выберите ответ'),
  propertyType: Yup.string().required('Выберите ответ'),
  propertyOwn: Yup.string().required('Выберите ответ'),
  period: Yup.string()
    .test('no-more-time', 'Cрок ипотеки не может превышать 30 лет', function (value: string | undefined) {
      if (value) {
        const numericValue = parseCurrencyToNumber(value);
        return numericValue <= 30;
      }
    })
    .test('more-than-zero', 'Cрок ипотеки не может быть меньше 4', function (value: string | undefined) {
      if (value) {
        const numericValue = parseCurrencyToNumber(value);
        return numericValue >= 4;
      }
    })
    .required('Выберите ответ'),
  monthlyPayment: Yup.string()
    .test('more-than-zero', 'Не может быть меньше минимального значения', function (value: string | undefined) {
      if (value) {
        const numericValue = parseCurrencyToNumber(value);
        return numericValue > 2654;
      }
    })
    .test('more-than-zero', 'Не может быть больше максимального значения', function (value: string | undefined) {
      if (value) {
        const numericValue = parseCurrencyToNumber(value);
        return numericValue < 51130;
      }
    })
    .required('Выберите ответ'),
});
