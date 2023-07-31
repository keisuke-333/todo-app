import type { ChangeEvent } from "react"

type Props = {
  value: string
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

export const FilterSelect = ({ value, onChange }: Props) => {
  return (
    <select
      className="w-[75px] rounded border px-1 py-2 shadow hover:border-gray-400"
      value={value}
      onChange={onChange}
    >
      <option value="all">All</option>
      <option value="active">Active</option>
      <option value="done">Done</option>
    </select>
  )
}
