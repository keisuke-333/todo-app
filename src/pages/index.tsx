import type { ChangeEvent, KeyboardEvent } from "react"
import { useState } from "react"

import { TodoAddInput } from "@/components/atoms/TodoAddInput"
import { Pagination } from "@/components/organisms/Pagination"
import { SearchAndFilterBar } from "@/components/organisms/SearchAndFilterBar"
import { TodoListTemplate } from "@/components/templates/TodoListTemplate"
import { useMutateTodo } from "@/hooks/useMutateTodo"
import { api } from "@/utils/api"

const HomePage = () => {
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null)
  const [editText, setEditText] = useState("")
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [loadingFlags, setLoadingFlags] = useState<Record<string, boolean>>({})
  const itemsPerPage = 5

  const { data, isLoading } = api.todo.fetch.useQuery()
  const { updateTitleMutation, updateIsCompletedMutation, deleteTodoMutation } = useMutateTodo()

  const handleCheckboxClick = (
    event: ChangeEvent<HTMLInputElement>,
    id: string,
    isCompleted: boolean,
  ) => {
    event.stopPropagation()
    setLoadingFlags((flags) => ({ ...flags, [id]: true }))
    updateIsCompletedMutation
      .mutateAsync({ id, isCompleted: !isCompleted })
      .catch((error) => {
        console.error("An error occurred during mutation: ", error)
      })
      .finally(() => {
        setLoadingFlags((flags) => ({ ...flags, [id]: false }))
      })
  }

  const handleStartEdit = (id: string, title: string) => {
    setEditingTodoId(id)
    setEditText(title)
  }

  const handleEditChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEditText(event.target.value)
  }

  const isValidLength = (title: string) => {
    const maxLength = 9
    return title.length <= maxLength
  }

  const handleEndEdit = (id: string) => {
    setLoadingFlags((flags) => ({ ...flags, [id]: true }))
    if (editText.trim() !== "" && isValidLength(editText)) {
      updateTitleMutation.mutateAsync({ id, title: editText }).catch((error) => {
        console.error("An error occurred during mutation: ", error)
      })
    } else if (!isValidLength(editText)) {
      alert("10文字以下で入力してください。")
    }
    setEditingTodoId(null)
    setEditText("")
    setLoadingFlags((flags) => ({ ...flags, [id]: false }))
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>, id: string) => {
    if (event.key === "Enter") {
      handleEndEdit(id)
    } else if (event.key === "Escape") {
      setEditingTodoId(null)
      setEditText("")
    }
  }

  const handleDeleteClick = (id: string) => {
    if (confirm("削除してもよろしいでしょうか？")) {
      deleteTodoMutation.mutateAsync({ id }).catch((error) => {
        console.error("An error occurred during deletion: ", error)
      })
      if (currentItems?.length === 1) {
        if (currentPage > 1) {
          setCurrentPage((oldPage) => oldPage - 1)
        } else {
          setCurrentPage(1)
        }
      }
    }
  }

  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value)
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

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
  const currentItems = filteredData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <TodoAddInput />
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
