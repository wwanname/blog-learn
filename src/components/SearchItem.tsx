import React from "react"
import { MenuItem } from '@headlessui/react'

export default function SearchItem({ setSearch }: {setSearch: React.Dispatch<React.SetStateAction<boolean>>} ) {
    return (
        <MenuItem>
            <span onClick={() => setSearch(true)} aria-label="Enable search tool" className="p-2 text-sm font-normal lg:font-light xl:font-normal dark:font-normal data-[focus]:bg-[var(--backdrop)] data-[focus]:text-[var(--background)] stroke-[var(--noticeoklchrelative)] data-[focus]:stroke-[var(--background)] transition-colors cursor-pointer flex items-center text-[var(--noticeoklchrelative)]">
                <SearchIcon />
                Search
            </span>
        </MenuItem>
    )
}

function SearchIcon() {
    return (
      <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      className="size-5 inline-flex mr-1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    )
  }