import { ReactSVG } from "react-svg";
import info from "../../../assets/icons/info.svg";
import { Trigger as RadixTrigger } from "@radix-ui/react-tooltip";

export const TooltipTrigger = () => {
  return (
    <RadixTrigger asChild>
      <button>
        <ReactSVG src={info} className="fill-white" />
      </button>
    </RadixTrigger>
  );
};
