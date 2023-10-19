import {
  Portal as RadixPortal,
  Content as RadixContent,
  Arrow as RadixArrow
} from "@radix-ui/react-tooltip";

interface TooltipContentProps {
  text: string
}

export const TooltipContent = (props: TooltipContentProps) => {
  return (
    <RadixPortal>
      <RadixContent
        className="bg-[#41434e] shadow-[0px_8px_16px_0px_rgba(0,_0,_0,_0.12)] w-full max-w-[266px] px-2 py-1 rounded text-white whitespace-pre-wrap"
        sideOffset={5}
        align={"start"}
      >
          {props.text}
        <RadixArrow className="fill-[#41434E]"/>
      </RadixContent>
    </RadixPortal>
  )
}
