import { parseCurrencyToNumber } from "../../utils/utils.tsx";
import { Alert, AlertProps } from "../alert/alert.tsx";
import { Label } from "../label/Label.tsx";
import { NumberInput } from "../numberInput/NumberInput.tsx";
import * as RadixSlider from "@radix-ui/react-slider";
import { clsx } from "clsx";

interface SliderProps {
  id: string;
  name: string;
  className?: string;
  label: string;
  value: number;
  setValue: (value: number) => void;
  icon?: string;
  min: number;
  max: number;
  step: number;
  tooltip?: string;
  alert?: AlertProps;
  minMaxLabels?: { min: string; max: string };
  error?: string | undefined | false;
}

export const Slider = (props: SliderProps) => {
  return (
    <div className={clsx("w-[325px]", props.className)}>
      <Label htmlFor={props.id} text={props.label} tooltip={props.tooltip} />
      <NumberInput
        name={props.name}
        value={props.value}
        id={props.id}
        icon={props.icon}
        onChange={(e) => props.setValue(parseCurrencyToNumber(e.target.value))}
        className={props.error ? "border-[#E76143]" : ""}
      />
      <RadixSlider.Root
        className="relative flex items-center select-none touch-none w-full h-5 bottom-[5%]"
        min={props.min}
        max={props.max}
        step={props.step}
        value={[props.value]}
        onValueChange={(range) => {
          const [firstValue] = range;
          props.setValue(firstValue);
        }}
        name={props.name}
      >
        <RadixSlider.Track className="relative grow rounded-full h-[3px]">
          <RadixSlider.Range className="absolute bg-[#fbe54d] rounded-full h-full" />
        </RadixSlider.Track>
        <RadixSlider.Thumb
          className="block w-[12px] h-[12px] bg-[#fbe54d] rounded-[6px] focus:outline-none"
          aria-label="Volume"
        />
      </RadixSlider.Root>
      {props.minMaxLabels && (
        <div className="relative flex justify-between bottom-[5%]">
          <div>{props.min + " " + props.minMaxLabels.min}</div>
          <div>{props.max + " " + props.minMaxLabels.max}</div>
        </div>
      )}
      {props.alert && (
        <Alert text={props.alert.text} error={props.alert.error} />
      )}
      {props.error && <Alert text={props.error} error />}
    </div>
  );
};
