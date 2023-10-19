import React, {ReactElement} from "react";
import {ImageProps} from "../image/Image.tsx";
import {Label} from "../label/Label.tsx";

interface TextInputProps {
  value: string | number;
  onChange: (value: string) => void;
  id: string;
  placeholder?: string;
  label?: string;
  icon?: ReactElement<ImageProps>;
  className?: string;
  tooltip?: string;
}

export const TextInput = (props: TextInputProps) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.value);
  };

  return (
    <div className="relative w-[325px] tablet:w-[350px] ">

      {props.label && <Label htmlFor={props.id} text={props.label} tooltip={props.tooltip}/>}
      <div className="relative">
        <input
          id={props.id}
          value={props.value}
          className="h-12 border border-solid border-[#333535] bg-[#2a2b31] pl-6 pr-14 py-3 mt-3 rounded w-full"
          placeholder={props.placeholder}
          onChange={onChange}
        />
        <div className="absolute top-1/2 right-6 transform -translate-y-[25%]">
          {props.icon}
        </div>
      </div>
    </div>
  )
}
