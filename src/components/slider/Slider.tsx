import * as RadixSlider from '@radix-ui/react-slider';
import {NumberInput} from "../numberInput/NumberInput.tsx";
import {Label} from "../label/Label.tsx";
import {Alert, AlertProps} from "../alert/alert.tsx";
import {removeCommasAndParseToNumber} from "../../utils/utils.tsx";

interface SliderProps {
  id: string;
  name: string;
  label: string;
  value: number;
  setValue: (value: number) => void;
  icon?: string;
  min: number;
  max: number;
  step: number;
  tooltip?: string;
  alert?: AlertProps;
  minMaxLabels?: { min: string, max: string };
  error?: string;
}

export const Slider = (props: SliderProps) => {
  return (
    <div>
      <Label
        htmlFor={props.id}
        text={props.label}
        tooltip={props.tooltip}
      />
      <NumberInput
        name={props.name}
        value={props.value}
        id={props.id}
        icon={props.icon}
        onChange={(e) => props.setValue(removeCommasAndParseToNumber(e.target.value))}
      />
      <RadixSlider.Root
        className="relative flex items-center select-none touch-none w-[325px] tablet:w-[363px] h-5 bottom-[6%]"
        defaultValue={[50]}
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
          <RadixSlider.Range className="absolute bg-[#fbe54d] rounded-full h-full"/>
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
      {props.alert &&
        <Alert text={props.alert.text} error={props.alert.error}/>
      }
      {props.error && <Alert text={props.error} error/>}
      <h3>{props.value}</h3>
    </div>
  );
};
