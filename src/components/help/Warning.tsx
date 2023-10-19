import warning from "./../../assets/icons/WarningCircle.svg"
import {Image} from "../image/Image.tsx";

interface WarningProps {
  text: string;
}

export const Warning = (props: WarningProps) => {
  return (
    <div className="bg-[#242529] flex gap-1 pt-[6px] px-3 rounded w-[325px] tablet:w-[350px] whitespace-pre-wrap">
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
