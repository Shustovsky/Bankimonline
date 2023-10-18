import React, {ReactElement} from "react";
import {ImageProps} from "../image/Image.tsx";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  id: string;
  label: string;
  icon?: ReactElement<ImageProps>;
  className?: string;
}

export const TextInput = (props: TextInputProps) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.value);
  };

  return (
    <div className="relative w-full">
      <label
        className="w-full h-5 "
        htmlFor={props.id}>
        {props.label}
      </label>
      <input
        id={props.id}
        value={props.value}
        className="h-12 border border-solid border-[#333535] bg-[#2a2b31] pl-6 pr-14 py-3 mt-3 rounded w-full"
        placeholder={props.placeholder}
        onChange={onChange}
      />
      <div className="absolute top-1/2 right-6 transform translate-y-[35%]">
        {props.icon}
      </div>
    </div>
  )
}
