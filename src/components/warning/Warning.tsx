import warning from "./../../assets/icons/WarningCircle.svg"
import {Image} from "../image/Image.tsx";
import {clsx} from "clsx";

export interface WarningProps {
  text: string;
  error?: boolean;
}

export const Warning = (props: WarningProps) => {
  return (
    <div className={clsx("text-sm bg-[#242529] flex gap-2 pt-[6px] px-3 rounded w-[325px] tablet:w-[363px] whitespace-pre-wrap", { ["bg-[#E76143]"]: props.error })}>
      <Image
        src={warning}
        alt="warning"
        className="w-4 h-4"
      />
      <p>
        {props.text}
      </p>
    </div>
  )
}
