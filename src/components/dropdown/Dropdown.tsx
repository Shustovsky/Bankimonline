import React, {useState} from "react";
import * as Select from "@radix-ui/react-select";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import caretDown from "../../assets/icons/CaretDown.svg";
import {Image} from "../image/Image";
import {DropdownItem} from "./dropdownItem/DropdownItem";
import {DropdownSearch} from "./dropdownSearch/DropdownSearch.tsx";
import {Label} from "../label/Label.tsx";

interface DropdownProps {
  placeholder: string;
  label: string;
  id: string;
  options: string[];
  value: string;
  setValue: (value: string) => void;
  searchable?: boolean;
  tooltip?: string;
}

export const Dropdown = (props: DropdownProps) => {
  const [searchValue, setSearchValue] = useState("");

  const filteredOptions = props.searchable
    ? props.options.filter((option) =>
      option.toLowerCase().includes(searchValue.toLowerCase())
    )
    : props.options;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <Select.Root value={props.value} onValueChange={props.setValue}>
      <div className="relative w-[325px] tablet:w-[363px]">
        <Label htmlFor={props.id} text={props.label} tooltip={props.tooltip}/>
        <Select.Trigger
          className=" text-xl border-solid border-[#333535] bg-[#2a2b31] flex flex-row justify-between w-full h-[58px] mt-[1.1rem] items-center px-6 border rounded overflow-hidden whitespace-nowrap"
        >
          <Select.Value aria-label={props.value} placeholder={props.placeholder}/>
          <Select.Icon className="shrink-0">
            <Image src={caretDown} alt="CaretDown" className=""/>
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content position="popper">
            <ScrollArea.Root className="w-full h-full" type="auto">
              <Select.Group
                className="mt-2 max-h-48 overflow-y-auto border border-[#333535] bg-[#242529] pb-2 px-4 rounded-lg text-white flex flex-col justify-between max-w-[325px] tablet:w-[363px] cursor-pointer"
              >
                {props.searchable &&
                  <DropdownSearch searchValue={searchValue} handleSearchChange={handleSearchChange}/>}
                <ScrollArea.Viewport className="w-full h-full">
                  {filteredOptions.map((item) => (
                    <DropdownItem key={item} item={item}/>
                  ))}
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar className="w-1" orientation="vertical">
                  <ScrollArea.Thumb className="bg-[#3f444d] rounded-lg"/>
                </ScrollArea.Scrollbar>
              </Select.Group>
            </ScrollArea.Root>
          </Select.Content>
        </Select.Portal>
      </div>
    </Select.Root>
  );
};
