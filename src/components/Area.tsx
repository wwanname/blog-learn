import React, { useState, useRef, useEffect, type RefObject } from 'react'
import { motion } from 'framer-motion'

interface Section {
  name: string
  icon1: string
  icon2: string
  icon3: string
}

interface AreaProps {
  searchRef: React.RefObject<HTMLDivElement | null>
  sectionsData: Section[]
}

export default function Area({ searchRef, sectionsData }: AreaProps) {
  const [focusIndex, setFocusIndex] = useState(0)
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    if (!itemRefs.current) return
    if (searchRef.current) {
      const handleKeyDown = (e: KeyboardEvent) => {
        const totalItems = sectionsData.length * 3

        if (e.key === 'ArrowDown') {
          setFocusIndex(prevIndex => (prevIndex + 1) % totalItems)
        } else if (e.key === 'ArrowUp') {
          setFocusIndex(prevIndex => (prevIndex - 1 + totalItems) % totalItems)
        }
      }

      itemRefs.current[focusIndex]?.focus()

      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [focusIndex])

  return (
    <motion.div
      ref={searchRef}
      tabIndex={0}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: { duration: 0.15, ease: 'easeInOut' }
      }}
      exit={{
        opacity: 0,
        scale: 0.95,
        transition: { duration: 0.2, ease: 'easeOut' }
      }}
      className='absolute top-20 h-110 w-lg rounded-2xl ring-offset-3 transition-all focus:ring-2 focus:ring-[var(--accent)] focus:outline-3 focus:outline-[var(--backdrop-accent)] sm:max-w-199/200 lg:h-110 lg:w-2xl 2xl:h-130 2xl:w-3xl'
    >
      <div className='relative size-full'>
        <div className='absolute size-full px-3 py-3.25 lg:px-3.25'>
          <div className='relative z-10 flex size-full justify-between text-black dark:text-white'>
            {/* Items */}
            <div className='h-full w-1/2 space-y-3 overflow-y-auto'>
              {sectionsData.map(
                (
                  section: {
                    name: string
                    icon1: string
                    icon2: string
                    icon3: string
                  },
                  index: React.Key | number | null | undefined
                ) => (
                  <Section
                    key={index}
                    section={section}
                    itemRefs={itemRefs}
                    sectionIndex={index as number}
                    setFocusIndex={setFocusIndex}
                  />
                )
              )}
            </div>
            {/* Previews */}
            <div className='flex h-full w-1/2 items-center justify-center'></div>
          </div>
        </div>
        {/* Footer */}
        <div className='background-bottom-search absolute bottom-0 z-10 inline-flex h-1/20 w-full items-center justify-center gap-x-1 p-2 text-xs/tight text-black/80 dark:text-white/50' />
        <div className='background-search size-full' />
      </div>
    </motion.div>
  )
}

const Section = ({
  section,
  sectionIndex,
  itemRefs,
  setFocusIndex
}: {
  section: { name: string; icon1: string; icon2: string; icon3: string }
  sectionIndex: number
  itemRefs: React.RefObject<(HTMLAnchorElement | null)[]>
  setFocusIndex: (index: number) => void
}) => {
  return (
    <div
      role='group'
      className='ml-0.5 flex w-[99.25%] flex-col space-y-1.75 transition-all'
    >
      <h4 className='inline-block text-xs lg:text-base'>{section.name}</h4>
      <Item
        name={section.icon1}
        index={sectionIndex * 3}
        itemRefs={itemRefs}
        setFocusIndex={setFocusIndex}
      />
      <Item
        name={section.icon2}
        index={sectionIndex * 3 + 1}
        itemRefs={itemRefs}
        setFocusIndex={setFocusIndex}
      />
      <Item
        name={section.icon3}
        index={sectionIndex * 3 + 2}
        itemRefs={itemRefs}
        setFocusIndex={setFocusIndex}
      />
    </div>
  )
}

const Item = ({
  name,
  index,
  itemRefs,
  setFocusIndex
}: {
  name: string
  index: number
  itemRefs: RefObject<(HTMLAnchorElement | null)[]>
  setFocusIndex: (index: number) => void
}) => {
  return (
    <a
      role='option'
      tabIndex={0}
      ref={el => {
        if (el) {
          itemRefs.current[index] = el
        }
      }}
      onFocus={() => setFocusIndex(index)}
      onMouseOver={() => setFocusIndex(index)}
      className='ring-search relative -left-0.5 flex h-1/8 w-full cursor-pointer items-center gap-1.25 rounded-lg bg-[var(--backdrop)] px-3 py-2 text-base transition-all focus:outline-none lg:text-sm 2xl:text-base dark:focus:bg-[var(--backdrop-accent-search)]'
    >
      <span className='text-sm lg:text-xs/tight 2xl:text-sm/tight'>#</span>
      <span>{name}</span>
    </a>
  )
}