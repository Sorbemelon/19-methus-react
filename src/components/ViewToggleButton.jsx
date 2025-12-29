export default function ViewToggleButton ({onClick, children}) {
    return (
        <button
            onClick={onClick}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-lg text-lg font-semibold transition duration-300 ease-in-out hover:cursor-pointer"
        >
            {children}
        </button>
    )
}