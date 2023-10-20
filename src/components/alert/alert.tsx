import { ReactSVG } from "react-svg";
import WarningSvg from "../../assets/icons/warningCircle.svg";
import { clsx } from "clsx";

export interface AlertProps {
  text: string;
  error?: boolean;
}

export const Alert = (props: AlertProps) => {
  return (
    <div
      className={clsx(
        "text-sm bg-[#242529] flex gap-2 pt-[6px] px-3 rounded w-[325px] tablet:w-[363px] whitespace-pre-wrap",
        { ["bg-[#E76143] mt-3 py-[6px]"]: props.error },
      )}
    >
      <div className="w-4 h-4">
        <ReactSVG
          src={WarningSvg}
          className={props.error ? "fill-white" : "fill-[#FBE54D]"}
        />
      </div>
      <p>{props.text}</p>
    </div>
  );
};
