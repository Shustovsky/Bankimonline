import {ReactSVG} from "react-svg";
import {Label} from "../label/Label.tsx";

interface TextInputProps {
  value: string | number;
  onChange: (value: string) => void;
  id: string;
  placeholder?: string;
  label?: string;
  icon?: string;
  className?: string;
  tooltip?: string;
}

export const TextInput = (props: TextInputProps) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.value);
  };

  return (
    <div className="relative w-[325px] tablet:w-[363px] ">
      {props.label && <Label htmlFor={props.id} text={props.label} tooltip={props.tooltip}/>}
      <div className="relative">
        <input
          id={props.id}
          value={props.value}
          className="h-[58px] border border-solid border-[#333535] bg-[#2a2b31] pl-6 pr-14 py-3 mt-5 rounded w-full text-2xl"
          placeholder={props.placeholder}
          onChange={onChange}
        />
        {props.icon && <div className="absolute top-1/2 right-7 transform -translate-y-[10%]">
          <ReactSVG src={props.icon}/>
        </div>}
      </div>
    </div>
  )
}
