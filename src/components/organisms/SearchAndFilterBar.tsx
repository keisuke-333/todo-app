import type { ChangeEvent } from "react"

import { FilterSelect } from "../atoms/FilterSelect"
import { TodoSearchInput } from "../atoms/TodoSearchInput"

type Props = {
  search: string
  filter: string
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleFilterChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

export const SearchAndFilterBar = ({
  search,
  filter,
  handleSearchChange,
  handleFilterChange,
}: Props) => {
  return (
    <div className="mb-4 flex w-[300px] items-center">
      <TodoSearchInput value={search} onChange={handleSearchChange} />
      <FilterSelect value={filter} onChange={handleFilterChange} />
    </div>
  )
}
