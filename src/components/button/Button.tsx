interface ButtonProps {
  value: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      className="bg-[#2d2d2d] w-[278px] flex justify-center h-16 items-center rounded-lg text-center text-[#848484] text-[1.2rem]"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
};
