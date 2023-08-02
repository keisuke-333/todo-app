import type { ChangeEvent } from "react"

import { SearchIcon } from "./icons/SearchIcon"

type Props = {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const TodoSearchInput = ({ value, onChange }: Props) => {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2">
        <SearchIcon />
      </div>
      <input
        type="text"
        className="mr-1 grow rounded-full border py-2 pl-9 pr-2 shadow hover:border-gray-400"
        placeholder="Search"
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
