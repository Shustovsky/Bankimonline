import { useState } from "react";
import { ReactSVG } from "react-svg";
import CaretDown from "../../assets/icons/caretDown.svg";
import { Alert } from "../alert/alert.tsx";
import { Label } from "../label/Label.tsx";
import { DropdownItem } from "./dropdownItem/DropdownItem";
import { DropdownSearch } from "./dropdownSearch/DropdownSearch.tsx";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as Select from "@radix-ui/react-select";
import { clsx } from "clsx";

interface DropdownProps {
  id: string;
  name: string;
  className?: string;
  placeholder: string;
  label?: string;
  options: string[];
  value: string;
  setValue: (value: string) => void;
  searchable?: boolean;
  tooltip?: string;
  error?: string | undefined | false;
}

export const Dropdown = (props: DropdownProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = props.searchable
    ? props.options.filter((option) =>
      option.toLowerCase().includes(searchValue.toLowerCase()),
    )
    : props.options;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <Select.Root
      value={props.value}
      onValueChange={props.setValue}
      onOpenChange={setIsOpen}
    >
      <div className={clsx("relative w-[325px]", props.className)}>
        {props.label && (
          <Label
            htmlFor={props.id}
            text={props.label}
            tooltip={props.tooltip}
          />
        )}
        <Select.Trigger
          className={clsx(
            "text-xl border-solid border-[#333535] bg-[#2a2b31] flex flex-row justify-between w-full h-[51px] " +
              "mt-[0.5rem] items-center px-6 border rounded overflow-hidden whitespace-nowrap text-ellipsis",
            { ["border-[#E76143]"]: props.error },
          )}
        >
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            <Select.Value
              aria-label={props.value}
              placeholder={props.placeholder}
            />
          </span>
          <Select.Icon
            className={clsx(
              "shrink-0",
              isOpen
                ? "transform rotate-180 transition delay-800"
                : "transform rotate-0 transition delay-800",
            )}
          >
            <ReactSVG src={CaretDown} />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content position="popper">
            <ScrollArea.Root className="w-full h-full" type="auto">
              <Select.Group className="mt-2 max-h-48 overflow-y-auto border border-[#333535] bg-[#242529] pb-2 px-4 rounded-lg text-white flex flex-col justify-between w-[325px] cursor-pointer">
                {props.searchable && (
                  <DropdownSearch
                    searchValue={searchValue}
                    handleSearchChange={handleSearchChange}
                  />
                )}
                <ScrollArea.Viewport className="w-full h-full">
                  {filteredOptions.map((item) => (
                    <DropdownItem key={item} item={item} />
                  ))}
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar
                  className="w-1 transform scale-y-[0.91]"
                  orientation="vertical"
                >
                  <ScrollArea.Thumb className="bg-[#3f444d] rounded-lg" />
                </ScrollArea.Scrollbar>
              </Select.Group>
            </ScrollArea.Root>
          </Select.Content>
        </Select.Portal>
        {props.error && <Alert text={props.error} error />}
      </div>
    </Select.Root>
  );
};
