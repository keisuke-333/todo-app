import type { Todo } from "@prisma/client"
import { useMemo } from "react"

export const usePagination = (
  data: Todo[],
  filter: string,
  search: string,
  currentPage: number,
) => {
  const itemsPerPage = 5
  let filteredData = data
  if (filter === "active") {
    filteredData = data?.filter((todo) => !todo.isCompleted) ?? []
  } else if (filter === "done") {
    filteredData = data?.filter((todo) => todo.isCompleted) ?? []
  }

  if (search !== "") {
    filteredData = filteredData?.filter((todo) => todo.title.includes(search)) ?? []
  }

  const numPages = Math.ceil((filteredData?.length ?? 0) / itemsPerPage)
  const currentItems = useMemo(
    () => filteredData?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [filteredData, currentPage, itemsPerPage],
  )

  return { numPages, currentItems, filteredData, itemsPerPage }
}
