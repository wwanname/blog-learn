import { Fragment, type ReactNode, useState, useEffect } from 'react'
import Font from "./Font.tsx"
import Theme from "./Theme.tsx"
import Search from "./Search.tsx"
import SearchItem from "./SearchItem.tsx"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, MenuButton, MenuItem, MenuItems, MenuHeading, MenuSection, Transition } from '@headlessui/react'

const link = [
  { label: 'Thanks', href: '/credit', action: Heart },
]

export default function Dropdown({ anchor }: {anchor: false | "top end" | "top start" | "right end" | "right start" | "bottom end" | "bottom start" | "left end" | "left start" | 'bottom' }) {
  const [search, setSearch] = useState<boolean>(false);
  //theme
  const [theme, setTheme] = useState(() => {
    if (import.meta.env.SSR) {
      return undefined
    }
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme')
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  })
  const toggleTheme = () => {
    const t = theme === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', t)
    setTheme(t)
  }
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.classList.remove('dark')
    } else {
      root.classList.add('dark')
    }
  }, [theme])
  //font
  const [font, setFont] = useState<string>(() => {
    if (import.meta.env.SSR) {
      return 'Inter'
    }
    const local = localStorage.getItem('font')
    if (typeof localStorage !== 'undefined' && local) {
      return local
    }
    return 'Inter'
  });
  const toggleFont = () => {
    const t = font === 'Inter' ? 'system-ui' : 'Inter'
    localStorage.setItem('font', t)
    setFont((prev) => (prev === 'Inter' ? 'system-ui' : 'Inter'));
  };
  useEffect(() => {
    document.body.style.fontFamily = font === 'system-ui' ? 'system-ui, sans-serif' : 'Inter, sans-serif';
  }, [font]);

  return (
    <>
    <div className='flex items-center justify-end'>
      <AnimatePresence presenceAffectsLayout mode='wait'>
        {search &&
        <>
          <Search search={search} setSearch={setSearch} />
        </>
        }
      </AnimatePresence>
      <AnimatePresence presenceAffectsLayout mode='wait'>
        {!search &&
        <Menu
          as={motion.div}
          animate={{ opacity: 1, scale: 1, transition: { ease: "easeOut", duration: 0.1, delay: 0.08 } }}
          exit={{ opacity: 0, scale: 0.95, transition: { ease: "easeIn", duration: 0.075 } }}
          className="inline-block text-right motion-scale-in-95 motion-opacity-in-0 duration-75"
        >
          <MenuButton
            className="group inline-flex justify-center rounded-md border border-[var(--noticeoklch)] p-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--accent)] cursor-pointer focus:ring-offset-2 focus:ring-offset-gray-100 transition-all hover:shadow-[var(--activeButton)] dark:hover:shadow-[var(--activeButtonDark)]"
            aria-label="menu"
          >
            <Burger />
          </MenuButton>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems anchor={anchor} className="rounded-lg relative z-10 border border-[var(--noticeoklch)] text-[var(--noticeoklchrelative)] divide-y-[0.05rem] divide-[var(--noticeoklch)] bg-[var(--background)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100 dark:focus-visible:ring-offset-gray-200">
              <MenuSection>
                <MenuHeading className="pl-2 pr-10 py-1 bg-[var(--backdrop-accent)] text-[var(--abstract)] text-sm">Actions</MenuHeading>
                <Theme theme={theme} toggleTheme={toggleTheme} />
                <SearchItem setSearch={setSearch} />
                <Font font={font} toggleFont={toggleFont} />
              </MenuSection>
              <MenuSection>
                <MenuHeading className="pl-2 pr-10 py-1 bg-[var(--backdrop-accent)] text-[var(--abstract)] text-sm">Credit</MenuHeading>
                  {link.map((item, index) => {
                    return (
                      <ItemLink key={`itemLink_${index}`} name={item.label} href={item.href}>
                        {typeof item.action === 'function' ? <item.action /> : null}
                      </ItemLink>
                    )
                  })}
              </MenuSection>
            </MenuItems>
          </Transition>
        </Menu>}
      </AnimatePresence>
    </div>
    </>
  )
}

function ItemLink({ name, href, children }: {name: ReactNode, href: string, children?: ReactNode}) {
  return (
    <MenuItem>
      <a href={`/creative-developer${href}`} className="p-2 text-sm font-normal lg:font-light xl:font-normal dark:font-normal data-[focus]:bg-[var(--backdrop-accent)] cursor-pointer flex items-center text-[var(--noticeoklchrelative)]">
        {children}
        {name}
      </a>
    </MenuItem>
  )
}

function Burger() {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    className="size-6 stroke-[var(--noticeoklch)] group-hover:stroke-[var(--backdrop)] transition-colors duration-200">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  )
}

function Heart() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      className="size-5 stroke-[var(--noticeoklchrelative)] group-hover:stroke-[var(--backdrop)] transition-colors duration-200 inline-flex mr-1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
  )
}