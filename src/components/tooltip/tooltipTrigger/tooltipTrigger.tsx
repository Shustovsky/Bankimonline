import {Trigger as RadixTrigger} from "@radix-ui/react-tooltip";
import {ReactSVG} from "react-svg";
import info from "../../../assets/icons/info.svg";

export const TooltipTrigger = () => {
  return (
    <RadixTrigger asChild>
      <button>
        <ReactSVG src={info}/>
      </button>
    </RadixTrigger>
  )
}
