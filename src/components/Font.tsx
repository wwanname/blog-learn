import { MenuItem } from '@headlessui/react'

export default function Font({ font, toggleFont }: {font: string, toggleFont: () => void}) {

    return (
        <MenuItem>
            <span aria-label="Change font" onClick={toggleFont} className="p-2 text-sm font-normal lg:font-light xl:font-normal dark:font-normal data-[focus]:bg-[var(--backdrop)] data-[focus]:text-[var(--background)] stroke-[var(--noticeoklchrelative)] data-[focus]:stroke-[var(--background)] transition-colors cursor-pointer flex items-center text-[var(--noticeoklchrelative)]">
                <Moon />
                {font === 'Inter' ? 'system' : 'Inter'}
            </span>
        </MenuItem>
    )
}

function Moon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        className="size-5 inline-flex mr-1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    )
}
