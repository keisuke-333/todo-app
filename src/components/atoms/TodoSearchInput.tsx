import type { ChangeEvent } from "react"

type Props = {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const TodoSearchInput = ({ value, onChange }: Props) => {
  return (
    <input
      type="text"
      className="mr-1 grow rounded-full border px-4 py-2 shadow hover:border-gray-400"
      placeholder="Search"
      value={value}
      onChange={onChange}
    />
  )
}
