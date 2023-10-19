import {Trigger as RadixTrigger} from "@radix-ui/react-tooltip";
import {Image} from "../../image/Image.tsx";
import info from "../../../assets/icons/Info.svg";

export const TooltipTrigger = () => {
  return (
    <RadixTrigger asChild>
      <button>
        <Image src={info} alt="info" />
      </button>
    </RadixTrigger>
  )
}
