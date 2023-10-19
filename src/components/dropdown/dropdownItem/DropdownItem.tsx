import * as Select from "@radix-ui/react-select";
import {Image} from "../../image/Image.tsx";
import check from "../../../assets/icons/Check.svg";

interface DropdownItemProps {
  item: string;
}

export const DropdownItem = (props: DropdownItemProps) => {
  return (
    <Select.Item
      value={props.item}
      className="relative text-sm w-full pr-8 focus-visible:outline-none mt-5 ">
      <Select.ItemText>
        {props.item}
      </Select.ItemText>
      <Select.ItemIndicator
        className="absolute right-4 w-5 top-1/2 right-6 transform -translate-y-2/4">
        <Image
          src={check}
          alt="CaretDown"
          className=""/>
      </Select.ItemIndicator>
    </Select.Item
    >
  )
}
