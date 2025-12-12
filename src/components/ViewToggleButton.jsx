export default function ViewToggleButton ({onClick, children}) {
    return (
        <button
            onClick={onClick}
            className="px-6 py-3 mb-8 bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-lg text-lg font-semibold transition duration-300 ease-in-out"
        >
            {children}
        </button>
    )
}