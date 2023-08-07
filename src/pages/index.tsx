import { useState } from "react"

import { Spinner } from "@/components/atoms/Spinner"
import { TodoAddInput } from "@/components/atoms/TodoAddInput"
import { Pagination } from "@/components/organisms/Pagination"
import { SearchAndFilterBar } from "@/components/organisms/SearchAndFilterBar"
import { TodoListTemplate } from "@/components/templates/TodoListTemplate"
import { useCreateTodo } from "@/hooks/useCreateTodo"
import { useDeleteTodo } from "@/hooks/useDeleteTodo"
import { useEditTodo } from "@/hooks/useEditTodo"
import { useFilterTodo } from "@/hooks/useFilterTodo"
import { usePagination } from "@/hooks/usePagination"
import { api } from "@/utils/api"

const HomePage = () => {
  const [loadingFlags, setLoadingFlags] = useState<Record<string, boolean>>({})
  const { data, isLoading } = api.todo.fetch.useQuery()
  const { title, setTitle, isPosting, handleCreateTodo } = useCreateTodo()
  const {
    editingTodoId,
    editText,
    handleEditChange,
    handleStartEdit,
    handleEndEdit,
    handleCheckboxClick,
    handleKeyDown,
  } = useEditTodo(setLoadingFlags)
  const { filter, search, currentPage, handleFilterChange, handleSearchChange, setCurrentPage } =
    useFilterTodo()
  const { numPages, currentItems, filteredData, itemsPerPage } = usePagination(
    data ?? [],
    filter,
    search,
    currentPage,
  )
  const { handleDeleteClick } = useDeleteTodo(
    setLoadingFlags,
    currentPage,
    setCurrentPage,
    currentItems?.length ?? 0,
  )

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {isPosting ? (
        <Spinner height="h-4" width="w-4" />
      ) : (
        <TodoAddInput title={title} setTitle={setTitle} handleCreateTodo={handleCreateTodo} />
      )}
      <SearchAndFilterBar
        search={search}
        filter={filter}
        handleSearchChange={handleSearchChange}
        handleFilterChange={handleFilterChange}
      />
      <TodoListTemplate
        currentItems={currentItems ?? []}
        editingTodoId={editingTodoId}
        editText={editText}
        handleCheckboxClick={handleCheckboxClick}
        handleStartEdit={handleStartEdit}
        handleEditChange={handleEditChange}
        handleEndEdit={handleEndEdit}
        handleKeyDown={handleKeyDown}
        handleDeleteClick={handleDeleteClick}
        isLoading={isLoading}
        loadingFlags={loadingFlags}
      />
      <Pagination
        currentPage={currentPage}
        numPages={numPages}
        itemsPerPage={itemsPerPage}
        totalItems={filteredData?.length ?? 0}
        setCurrentPage={setCurrentPage}
      />
    </main>
  )
}

export default HomePage
