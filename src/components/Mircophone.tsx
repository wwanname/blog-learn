export default function Microphone({ onClick, MicroRef }: { onClick: () => void, MicroRef: React.RefObject<HTMLButtonElement | null> }) {
    return (
        <button ref={MicroRef} type="button" onClick={onClick} className="focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 transition-all cursor-pointer lg:-mt-0.25 p-1 lg:p-0 rounded-md">
            <MicIcon />
        </button>
    )
}

function MicIcon() {
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        className="size-5 fill-[var(--noticeoklch)] group-hover:fill-[var(--backdrop)]">
            <path d="M7 4a3 3 0 0 1 6 0v6a3 3 0 1 1-6 0V4Z" />
            <path d="M5.5 9.643a.75.75 0 0 0-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-1.5v-1.546A6.001 6.001 0 0 0 16 10v-.357a.75.75 0 0 0-1.5 0V10a4.5 4.5 0 0 1-9 0v-.357Z" />
        </svg>
    )
}