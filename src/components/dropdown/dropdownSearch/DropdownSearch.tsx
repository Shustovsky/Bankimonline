import React from "react";
import {Image} from "../../image/Image.tsx";
import MagnifyingGlass from "./../../../assets/icons/MagnifyingGlass.svg"

interface DropdownSearchProps {
  searchValue: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DropdownSearch = (props: DropdownSearchProps) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Поиск.."
        value={props.searchValue}
        className="border border-solid border-[#333535] bg-[#2a2b31] mt-4 py-1 w-full h-8 px-4 rounded pl-8"
        onChange={props.handleSearchChange}
      />
      <Image src={MagnifyingGlass} alt="search" className="absolute top-1/2 left-2 transform -translate-y-[5%]"/>
    </div>
  )
}
