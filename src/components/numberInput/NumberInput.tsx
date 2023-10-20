import { NumericFormat } from "react-number-format";
import { ReactSVG } from "react-svg";
import { Alert } from "../alert/alert.tsx";
import { Label } from "../label/Label.tsx";
import { clsx } from "clsx";

interface NumberInputProps {
  id: string;
  name: string;
  value: number;
  onChange: (values: number | undefined) => void;
  placeholder?: string;
  label?: string;
  icon?: string;
  className?: string;
  tooltip?: string;
  error?: string | undefined | false;
}

export const NumberInput = (props: NumberInputProps) => {
  return (
    <div className="relative w-[325px]">
      {props.label && (
        <Label htmlFor={props.id} text={props.label} tooltip={props.tooltip} />
      )}
      <div className="relative">
        <NumericFormat
          thousandsGroupStyle="thousand"
          name={props.name}
          value={props.value}
          thousandSeparator=","
          className={clsx(
            "h-[51px] border border-solid border-[#333535] bg-[#2a2b31] pl-[1.3rem] pr-14 py-3  mt-[0.5rem] rounded w-full text-2xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
            { ["border-[#E76143]"]: props.error },
            props.className,
          )}
          placeholder={props.placeholder}
          onValueChange={(values) => props.onChange(values.floatValue)}
        />
        {props.icon && (
          <div className="absolute top-1/2 right-[1.5rem] transform -translate-y-[32%]">
            <ReactSVG src={props.icon} />
          </div>
        )}
      </div>
      {props.error && <Alert text={props.error} error />}
    </div>
  );
};
