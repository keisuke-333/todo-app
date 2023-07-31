type Props = {
  isDisabled: boolean
  onClick: () => void
  children: React.ReactNode
}

export const PaginationButton = ({ isDisabled, onClick, children }: Props) => (
  <button
    className={`rounded px-2 py-1 text-sm font-bold text-gray-800 ${
      isDisabled ? "cursor-not-allowed bg-gray-300" : "bg-gray-300 hover:bg-gray-400"
    }`}
    onClick={onClick}
    disabled={isDisabled}
  >
    {children}
  </button>
)
