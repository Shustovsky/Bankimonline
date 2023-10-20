import { Tooltip } from "../tooltip/Tooltip.tsx";
import { Root as RadixLabelRoot } from "@radix-ui/react-label";
import { clsx } from "clsx";

interface LabelProps {
  htmlFor: string;
  text: string;
  className?: string;
  tooltip?: string;
}

export const Label = (props: LabelProps) => {
  return (
    <RadixLabelRoot
      className={clsx("min-h-5 flex gap-[6px] text-xl", props.className)}
      htmlFor={props.htmlFor}
    >
      {props.text}
      {props.tooltip && <Tooltip text={props.tooltip} />}
    </RadixLabelRoot>
  );
};
