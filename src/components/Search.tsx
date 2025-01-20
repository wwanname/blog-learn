import Area from "./Area.tsx"
import { motion } from "framer-motion"
import { Input } from '@headlessui/react'
import Microphone from "./Mircophone.tsx"
import useSpeechRecognition from "../js/useSpeech.ts"
import article from "../js/SearchItem.json"
import Fuse from "fuse.js"
import { useCallback, useRef, useState, useEffect, type Dispatch, type SetStateAction } from 'react'

interface SearchProps {
  search: boolean;
  setSearch: Dispatch<SetStateAction<boolean>>
}

export default function Search({ search, setSearch }: SearchProps) {
    const [text, setText] = useState('');
    const handleTranscript = useCallback((transcript: string) => {
      setText(transcript);
    }, []);
    const { toggleListening } = useSpeechRecognition({
      onTranscript: handleTranscript,
      search: search
    });
    const inputRef = useRef<HTMLInputElement | null>(null);
    const searchRef = useRef<HTMLDivElement | null>(null)
    const MicroRef = useRef<HTMLButtonElement | null>(null)

    //search toogle
    useEffect(() => {
      if (!search) return
        const handleKeyDown = (event: KeyboardEvent) => {
          if (event.key === 'Escape') {
            setSearch(false)
            setText('')
          }
        };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [search]);
    useEffect(() => {
      if (!search) return
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      if (search && inputRef.current) {
        document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
        document.documentElement.style.overflow = 'hidden';
        inputRef.current.focus()
      } else {
        document.documentElement.style.paddingRight = '0px';
        document.documentElement.style.overflow = '';
        setText('')
      }
      return () => {
        document.documentElement.style.paddingRight = '0px';
        document.documentElement.style.overflow = '';
      };
    }, [search])
    useEffect(() => {
      if (!search) return
      const handleClickOutside = (event: MouseEvent) => {
        if (
          searchRef.current && !searchRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node) &&
          MicroRef.current && !MicroRef.current.contains(event.target as Node)
        ) {
          setSearch(false);
          setText('');
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [search]);
    useEffect(() => {
      const isValidKey = (key: string) => {return /^[a-zA-Z0-9.,!?;'"()&%$#@_*+]/.test(key)}
      if (search) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (['Tab', 'Shift', 'Control', 'Alt', 'Escape', 'CapsLock', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return
        if (isValidKey(e.key)) inputRef.current?.focus()};
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);}
    }, []);

    //search tool
    const fuse = new Fuse(article, {
        keys: [
            'name',
            'icon1',
            'icon2',
            'icon3'
        ],
        includeScore: true
    })
    const results = fuse.search(text)
    const sectionResult = text !== '' ? results.map(result => result.item) : article

    return (
        <>
        <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className='absolute origin-right right-0 inline-flex items-center justify-end gap-3 lg:gap-2'>
          <Input
            ref={inputRef}
            value={text}
            type="text"
            name="search"
            spellCheck={false}
            onFocus={() => setSearch(true)}
            onChange={(e) => setText(e.target.value)}
            className='text-right text-[var(--noticeoklch)] focus:outline-0 inline-flex text-xl 2xl:text-2xl'
            placeholder="What would you like to do?"
          />
          <Microphone
            onClick={toggleListening}
            MicroRef={MicroRef}
          />
        </motion.div>
        <Area searchRef={searchRef} sectionsData={sectionResult} />
        </>
    )
}