import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { israeliCities } from "../assets/data/israeliCities.ts";
import currencies from "../assets/icons/currencies.svg";
import { Button } from "../components/button/Button.tsx";
import { Divider } from "../components/divider/Divider.tsx";
import { Dropdown } from "../components/dropdown/Dropdown.tsx";
import { NumberInput } from "../components/numberInput/NumberInput.tsx";
import { Slider } from "../components/slider/Slider.tsx";
import { HeadingLevel, Title } from "../components/title/Title.tsx";
import { updateFormData } from "../store/reducers/formSlice.ts";
import { RootState } from "../store/store.ts";
import { parseCurrencyToNumber } from "../utils/utils.tsx";
import { validationSchema } from "../yup/validationSchema.ts";
import { useFormik } from "formik";

export const CalculatorPage = () => {
  const dispatch = useDispatch();
  const formValues = useSelector((state: RootState) => state.form);

  const formik = useFormik({
    initialValues: {
      propertyCost: 1000000,
      purchaseCity: "",
      timeRegistration: "",
      initialPayment: 500000,
      propertyType: "",
      propertyOwn: "",
      period: 30,
      monthlyPayment: 2654,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(updateFormData(values));
      localStorage.setItem("calculatorData", JSON.stringify(values));
      console.log(formValues, "redux");
    },
  });

  const newInitialPaymentMax = parseCurrencyToNumber(
    formik.values.propertyCost,
  );

  if (parseCurrencyToNumber(formik.values.propertyCost) > 0) {
    if (
      parseCurrencyToNumber(formik.values.propertyCost) <
      parseCurrencyToNumber(formik.values.initialPayment)
    ) {
      formik.setFieldValue(
        "initialPayment",
        parseCurrencyToNumber(formik.values.propertyCost),
      );
    }
  }

  useEffect(() => {
    const MONTH_IN_YEAR = 12;
    const paymentInYear =
      parseCurrencyToNumber(formik.values.propertyCost) /
      parseCurrencyToNumber(formik.values.period);
    const paymentInMonth = paymentInYear / MONTH_IN_YEAR;
    const magicNumber = 124;
    const ceil = Math.ceil(paymentInMonth - magicNumber);
    formik.setFieldValue("monthlyPayment", ceil);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.period]);

  return (
    <div className="w-full h-[100%] pt-32 bg-[#161616] text-white flex justify-center overflow-hidden">
      <div className="w-[1130px] mobile:mx-[20px] mobile:leading-normal tablet:mx-[62px] desktop:mx-0">
        <Title
          level={HeadingLevel.h1}
          text={"Рассчитайте ипотеку быстро и просто"}
          className="desktop:m-0"
        />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit(e);
          }}
        >
          <div
            className="relative pt-[23px] flex flex-col flex-wrap
                       mobile:gap-y-[2.1rem] mobile:content-center mobile:mt-3
                       tablet:pt-[9px] tablet:h-[532px] tablet:gap-y-[1.7rem] tablet:gap-x-[4.1rem] tablet:content-start
                       desktop:pt-[9px]  desktop:h-[300px] desktop:gap-y-[2.1rem] desktop:gap-x-0 desktop:content-between "
          >
            <NumberInput
              id="property-coast"
              name="propertyCost"
              value={formik.values.propertyCost}
              onChange={formik.handleChange}
              placeholder="1,000,000"
              label="Стоимость недвижимости"
              icon={currencies}
              error={formik.errors.propertyCost}
            />
            <Slider
              id="initial-payment"
              name="initialPayment"
              className={"mobile:order-2 tablet:order-3 desktop:order-none"}
              label="Первоначальный взнос"
              value={formik.values.initialPayment}
              setValue={(value: number) => {
                formik.setTouched({ ...formik.touched, initialPayment: true });
                formik.setFieldValue("initialPayment", value);
              }}
              icon={currencies}
              min={0}
              max={newInitialPaymentMax}
              step={100}
              tooltip={`Основная квартира: у заемщика нет квартиры ставка финансирования.\nМаксимум до 75% \n\n Альтернативная квартира: Для заемщика квартира, которую он обязуется продать в течение двух лет ставка финансирования Максимум до 70% \n\n Вторая квартира или выше: у заемщика уже есть ставка финансирования квартиры. Максимум до 50%`}
              alert={{
                text: `Cумма финансирования:500,000 ₪ \nПроцент финансирования:50%`,
              }}
              error={
                formik.touched.initialPayment && formik.errors.initialPayment
              }
            />
            <Dropdown
              id="purchase-city"
              name="purchaseCity"
              className={"mobile:order-6 tablet:order-5 desktop:order-none"}
              label="Город покупки недвижимости"
              value={formik.values.purchaseCity}
              setValue={(value: string) => {
                formik.setTouched({ ...formik.touched, purchaseCity: true });
                formik.setFieldValue("purchaseCity", value);
              }}
              placeholder="Выберите город"
              options={israeliCities}
              searchable
              error={formik.touched.purchaseCity && formik.errors.purchaseCity}
            />
            <Dropdown
              id="property-type"
              name="propertyType"
              className={
                "mobile:order-3 tablet:order-6 desktop:order-none tablet:mt-28 desktop:mt-0"
              }
              label="Тип недвижимости"
              value={formik.values.propertyType}
              setValue={(value: string) => {
                formik.setTouched({ ...formik.touched, propertyType: true });
                formik.setFieldValue("propertyType", value);
              }}
              placeholder="Выберите тип недвижимости"
              options={[
                "Квартира от застройщика",
                "Квартира на вторичном рынке",
                "Частный дом",
                "Земельный участок / Строительство",
                "Коммерческая недвижимость",
              ]}
              error={formik.touched.propertyType && formik.errors.propertyType}
            />
            <Dropdown
              id="time-registration"
              name="timeRegistration"
              className={"mobile:order-4 tablet:order-2 desktop:order-none"}
              label="Когда вы планируете оформить ипотеку?"
              value={formik.values.timeRegistration}
              setValue={(value: string) => {
                formik.setTouched({
                  ...formik.touched,
                  timeRegistration: true,
                });
                formik.setFieldValue("timeRegistration", value);
              }}
              placeholder="Выберите период"
              options={[
                "В ближайший месяц",
                "В ближайшие 2 месяц",
                "В ближайшие 3 месяца",
                "В ближайшие 6 месяцев",
              ]}
              searchable
              error={
                formik.touched.timeRegistration &&
                formik.errors.timeRegistration
              }
            />

            <Dropdown
              id="property-own"
              name="propertyOwn"
              className={"mobile:order-5 tablet:order-4 desktop:order-none"}
              label="Вы уже владеете недвижимостью?"
              value={formik.values.propertyOwn}
              setValue={(value: string) => {
                formik.setTouched({ ...formik.touched, propertyOwn: true });
                formik.setFieldValue("propertyOwn", value);
              }}
              placeholder="Выберите ответ"
              options={[
                "Нет, я пока не владею недвижимостью",
                "Да, у меня уже есть недвижимость в собственности",
                "Я собираюсь продать единственную недвижимость в ближайшие два года, чтобы использовать полученный капитал для приобретения новой",
              ]}
              error={formik.touched.propertyOwn && formik.errors.propertyOwn}
            />
          </div>
          <Divider />
          <div className={"relative mobile:my-[32px] tablet:flex-row mobile:justify-center mobile:items-center tablet:mt-[20px] desktop:mt-[38px] desktop:mb-12 desktop:gap-x-16 flex flex-wrap mobile:flex-col tablet:mb-14 tablet:gap-x-16"}>
            <Slider
              id="period"
              name="period"
              label="Cрок"
              value={formik.values.period}
              setValue={(value: number) => {
                formik.setTouched({ ...formik.touched, period: true });
                formik.setFieldValue("period", value);
              }}
              min={4}
              max={30}
              step={1}
              minMaxLabels={{ min: "года", max: "лет" }}
              error={formik.touched.period && formik.errors.period}
            />
            <Slider
              id="monthly-payment"
              name="monthlyPayment"
              label="Ежемесячный платеж"
              value={formik.values.monthlyPayment}
              setValue={(value: number) => {
                formik.setTouched({ ...formik.touched, monthlyPayment: true });
                formik.setFieldValue("monthlyPayment", value);
              }}
              icon={currencies}
              min={2654}
              max={51130}
              step={1}
              minMaxLabels={{ min: "₪", max: "₪" }}
              alert={{
                text: `Увеличьте ежемесячный платеж и \n переплачивайте меньше`,
              }}
              error={
                formik.touched.monthlyPayment && formik.errors.monthlyPayment
              }
            />
          </div>
          <Divider fullScreenSize />
          <div className="flex mobile:justify-center tablet:justify-end py-8 mobile:mt-[32px]">
            <Button
              value={"Продолжить"}
              className={formik.isValid ? "bg-[#FBE54D]" : ""}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
