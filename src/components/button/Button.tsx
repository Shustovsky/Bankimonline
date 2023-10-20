import {clsx} from "clsx";

interface ButtonProps {
  value: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      className={clsx("bg-[#2d2d2d] mobile:w-[320px] tablet:w-[250px] flex justify-center h-16 items-center rounded-lg text-center text-[#848484] text-[1.2rem]", props.className)}
      onClick={props.onClick}
      type="submit"
    >
      {props.value}
    </button>
  );
};
