import {Provider as RadixProvider, Root as RadixRoot} from '@radix-ui/react-tooltip';
import {TooltipTrigger} from "./tooltipTrigger/tooltipTrigger.tsx";
import {TooltipContent} from "./tooltipContent/TooltipContent.tsx";

interface TooltipProps {
  text: string;
}

export const Tooltip = (props: TooltipProps) => {
  return (
    <RadixProvider>
      <RadixRoot open={true}>
        <TooltipTrigger/>
        <TooltipContent text={props.text}/>
      </RadixRoot>
    </RadixProvider>
  )
}
