import type { ChangeEvent } from "react"
import { useCallback, useState } from "react"

export const useFilterTodo = (initialFilter = "all", initialSearch = "") => {
  const [filter, setFilter] = useState(initialFilter)
  const [search, setSearch] = useState(initialSearch)
  const [currentPage, setCurrentPage] = useState(1)

  const handleFilterChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value)
    setCurrentPage(1)
  }, [])

  const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
    setCurrentPage(1)
  }, [])

  return {
    filter,
    search,
    currentPage,
    handleFilterChange,
    handleSearchChange,
    setCurrentPage,
  }
}
