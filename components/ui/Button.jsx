export default function Button({ children, primary, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 ${primary
          ? "bg-blue-900 text-white hover:bg-blue-800"
          : "bg-yellow-500 text-blue-900 hover:bg-yellow-400"
        } ${className}`}
    >
      {children}
    </button>
  )
}