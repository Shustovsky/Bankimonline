import * as RadixSlider from '@radix-ui/react-slider';
import {TextInput} from "../textInput/TextInput.tsx";
import {Label} from "../label/Label.tsx";
import {Warning} from "../help/Warning.tsx";
import {ReactElement} from "react";
import {ImageProps} from "../image/Image.tsx";

interface SliderProps {
  label: string;
  id: string;
  value: number[];
  setValue: (value: number[]) => void;
  icon?: ReactElement<ImageProps>;
  min: number;
  max: number;
  step: number;
  tooltip?: string;
  warning?: string;
  minMaxLabels?: { min: string, max: string };
}

export const Slider = (props: SliderProps) => {
  const handleTextInputChange = (newValue: string) => {
    const parsedValues = newValue.split(',').map(Number);
    props.setValue(parsedValues);
  };

  return (
    <div>
      <Label htmlFor={props.id} text={props.label} tooltip={props.tooltip}/>
      <TextInput
        value={props.value.join(',')}
        onChange={handleTextInputChange}
        id={props.id}
        icon={props.icon}
      />
      <RadixSlider.Root
        className="relative flex items-center select-none touch-none w-[325px] tablet:w-[363px] h-5 bottom-[8%]"
        defaultValue={[50]}
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        onValueChange={props.setValue}
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
      {props.warning &&
        <Warning text={props.warning}/>
      }
    </div>
  );
};
