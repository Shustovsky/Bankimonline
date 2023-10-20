import { useEffect, useMemo } from "react";
import { israeliCities } from "../assets/data/israeliCities.ts";
import currencies from "../assets/icons/currencies.svg";
import { Button } from "../components/button/Button.tsx";
import { Divider } from "../components/divider/Divider.tsx";
import { Dropdown } from "../components/dropdown/Dropdown.tsx";
import { NumberInput } from "../components/numberInput/NumberInput.tsx";
import { Slider } from "../components/slider/Slider.tsx";
import { HeadingLevel, Title } from "../components/title/Title.tsx";
import { MAX_PERIOD_CREDIT, MIN_PERIOD_CREDIT } from "../constant.ts";
import { useAddCreditMutation } from "../store/credit.ts";
import { calculateMonthPayment } from "../utils/calculate.ts";
import { validationSchema } from "../yup/validationSchema.ts";
import { useFormik } from "formik";

export const CalculatorPage = () => {
  const [credit] = useAddCreditMutation();
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
      
      credit(values);
    },
  });

  const handleSetValue = (
    fieldName: string,
    value: string | number | undefined,
  ) => {
    formik.setTouched({ ...formik.touched, [fieldName]: true });
    formik.setFieldValue(fieldName, value);
  };

  const initialPaymentMin = useMemo(
    () => calculateMonthPayment(formik.values.propertyCost, MAX_PERIOD_CREDIT),
    [formik.values.propertyCost],
  );

  const initialPaymentMax = useMemo(
    () => calculateMonthPayment(formik.values.propertyCost, MIN_PERIOD_CREDIT),
    [formik.values.propertyCost],
  );

  useEffect(() => {
    if (formik.values.propertyCost > 0) {
      if (formik.values.propertyCost < formik.values.initialPayment) {
        formik.setFieldValue("initialPayment", formik.values.propertyCost);
      }
    }
  }, [formik.values.propertyCost]);

  useEffect(() => {
    const monthPayment = calculateMonthPayment(
      formik.values.propertyCost,
      formik.values.period,
    );

    formik.setFieldValue("monthlyPayment", monthPayment);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.period]);

  return (
    <div className="w-full h-[100%] pt-32 bg-[#161616] text-white flex justify-center overflow-hidden">
      <div className="w-[1138px] mobile:mx-[20px] mobile:leading-normal tablet:mx-[62px] desktop:mx-0">
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
                       tablet:h-auto tablet:flex-row tablet:pt-[9px] tablet:gap-y-[1.7rem] tablet:gap-x-[4.1rem] tablet:content-start
                       desktop:h-auto desktop:pt-[9px] desktop:mb-[2.1rem] desktop:flex-row desktop:gap-y-[2.1rem] desktop:gap-x-[5rem]"
          >
            <NumberInput
              id="property-coast"
              name="propertyCost"
              value={formik.values.propertyCost}
              onChange={(value) => handleSetValue("propertyCost", value)}
              placeholder="1,000,000"
              label="Стоимость недвижимости"
              icon={currencies}
              error={formik.errors.propertyCost}
            />
            <Slider
              id="initial-payment"
              name="initialPayment"
              className="mobile:order-2 tablet:order-4 desktop:order-4"
              label="Первоначальный взнос"
              value={formik.values.initialPayment}
              setValue={(value) => handleSetValue("initialPayment", value)}
              icon={currencies}
              min={0}
              max={formik.values.propertyCost}
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
              className={"mobile:order-6 tablet:order-2 desktop:order-2"}
              label="Город покупки недвижимости"
              value={formik.values.purchaseCity}
              setValue={(value) => handleSetValue("purchaseCity", value)}
              placeholder="Выберите город"
              options={israeliCities}
              searchable
              error={formik.touched.purchaseCity && formik.errors.purchaseCity}
            />
            <Dropdown
              id="property-type"
              name="propertyType"
              className={"mobile:order-3 tablet:order-6 desktop:order-5"}
              label="Тип недвижимости"
              value={formik.values.propertyType}
              setValue={(value) => handleSetValue("propertyType", value)}
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
              className={"mobile:order-4 tablet:order-3 desktop:order-3"}
              label="Когда вы планируете оформить ипотеку?"
              value={formik.values.timeRegistration}
              setValue={(value) => handleSetValue("timeRegistration", value)}
              placeholder="Выберите период"
              options={[
                "В ближайший месяц",
                "В ближайшие 2 месяц",
                "В ближайшие 3 месяца",
                "В ближайшие 6 месяцев",
              ]}
              error={
                formik.touched.timeRegistration &&
                formik.errors.timeRegistration
              }
            />
            <Dropdown
              id="property-own"
              name="propertyOwn"
              className={"mobile:order-5 tablet:order-6 desktop:order-6"}
              label="Вы уже владеете недвижимостью?"
              value={formik.values.propertyOwn}
              setValue={(value) => handleSetValue("propertyOwn", value)}
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
          <div
            className={
              "relative mobile:my-[32px] tablet:flex-row mobile:justify-center tablet:justify-start mobile:items-center desktop:items-start tablet:mt-[20px] desktop:mt-[38px] desktop:mb-12 desktop:gap-x-16 flex flex-wrap mobile:flex-col tablet:mb-14 tablet:gap-x-16"
            }
          >
            <Slider
              id="period"
              name="period"
              label="Cрок"
              value={formik.values.period}
              setValue={(value) => handleSetValue("period", value)}
              min={MIN_PERIOD_CREDIT}
              max={MAX_PERIOD_CREDIT}
              step={1}
              minMaxLabels={{ min: "года", max: "лет" }}
              error={formik.touched.period && formik.errors.period}
            />
            <Slider
              id="monthly-payment"
              name="monthlyPayment"
              label="Ежемесячный платеж"
              value={formik.values.monthlyPayment}
              setValue={(value) => handleSetValue("monthlyPayment", value)}
              icon={currencies}
              min={initialPaymentMin}
              max={initialPaymentMax}
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
