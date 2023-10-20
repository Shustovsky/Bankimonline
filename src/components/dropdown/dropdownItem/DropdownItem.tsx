import { ReactSVG } from "react-svg";
import Check from "../../../assets/icons/check.svg";
import * as Select from "@radix-ui/react-select";

interface DropdownItemProps {
  item: string;
}

export const DropdownItem = (props: DropdownItemProps) => {
  return (
    <Select.Item
      value={props.item}
      className="relative text-sm w-full pr-8 focus-visible:outline-none mt-5 "
    >
      <Select.ItemText>{props.item}</Select.ItemText>
      <Select.ItemIndicator className="absolute right-4 w-5 top-1/2 right-6 transform -translate-y-2/4">
        <ReactSVG src={Check} />
      </Select.ItemIndicator>
    </Select.Item>
  );
};
