import { TooltipContent } from "./tooltipContent/TooltipContent.tsx";
import { TooltipTrigger } from "./tooltipTrigger/tooltipTrigger.tsx";
import {
  Provider as RadixProvider,
  Root as RadixRoot,
} from "@radix-ui/react-tooltip";

interface TooltipProps {
  text: string;
}

export const Tooltip = (props: TooltipProps) => {
  return (
    <RadixProvider>
      <RadixRoot>
        <TooltipTrigger />
        <TooltipContent text={props.text} />
      </RadixRoot>
    </RadixProvider>
  );
};
