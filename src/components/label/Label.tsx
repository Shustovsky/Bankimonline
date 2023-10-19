import {Root as RadixLabelRoot} from '@radix-ui/react-label';
import {clsx} from "clsx";
import {Tooltip} from "../tooltip/Tooltip.tsx";

interface LabelProps {
  htmlFor: string;
  text: string;
  className?: string;
  tooltip?: string;
}

export const Label = (props: LabelProps) => {
  return (
    <RadixLabelRoot
      className={clsx("h-5 flex gap-[6px]", props.className)}
      htmlFor={props.htmlFor}>
      {props.text}
      {props.tooltip &&
        <Tooltip text={props.tooltip}/>
      }
    </RadixLabelRoot>
  )
}
