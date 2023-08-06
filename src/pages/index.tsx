import type { ChangeEvent, FormEvent, KeyboardEvent, MouseEvent } from "react"
import { useState } from "react"
import { toast } from "react-hot-toast"

import { Spinner } from "@/components/atoms/Spinner"
import { TodoAddInput } from "@/components/atoms/TodoAddInput"
import { Pagination } from "@/components/organisms/Pagination"
import { SearchAndFilterBar } from "@/components/organisms/SearchAndFilterBar"
import { TodoListTemplate } from "@/components/templates/TodoListTemplate"
import { useMutateTodo } from "@/hooks/useMutateTodo"
import { api } from "@/utils/api"
import { isNotEmpty, isValidLength } from "@/utils/validation"

const HomePage = () => {
  const [title, setTitle] = useState("")
  const [isPosting, setIsPosting] = useState(false)
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null)
  const [editText, setEditText] = useState("")
  const [originalText, setOriginalText] = useState("")
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [loadingFlags, setLoadingFlags] = useState<Record<string, boolean>>({})
  const itemsPerPage = 5

  const { data, isLoading } = api.todo.fetch.useQuery()
  const { createTodoMutation, updateTitleMutation, updateIsCompletedMutation, deleteTodoMutation } =
    useMutateTodo()

  const handleCreateTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isNotEmpty(title)) {
      return
    }
    if (!isValidLength(title)) {
      toast.error("10文字以下で入力してください。")
      return
    }
    setIsPosting(true)
    createTodoMutation
      .mutateAsync({ title })
      .then(() => {
        setTitle("")
      })
      .catch((error) => {
        console.error("An error occurred: ", error)
      })
      .finally(() => setIsPosting(false))
  }

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
    setOriginalText(title)
  }

  const handleEditChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEditText(event.target.value)
  }

  const handleEndEdit = (id: string) => {
    if (isNotEmpty(editText) && isValidLength(editText) && editText !== originalText) {
      setLoadingFlags((flags) => ({ ...flags, [id]: true }))
      updateTitleMutation
        .mutateAsync({ id, title: editText })
        .catch((error) => {
          console.error("An error occurred during mutation: ", error)
        })
        .finally(() => {
          setLoadingFlags((flags) => ({ ...flags, [id]: false }))
        })
    } else if (!isValidLength(editText)) {
      toast.error("10文字以下で入力してください。")
    }
    setEditingTodoId(null)
    setEditText("")
    setOriginalText("")
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>, id: string) => {
    if (event.key === "Enter") {
      handleEndEdit(id)
    } else if (event.key === "Escape") {
      setEditingTodoId(null)
      setEditText("")
    }
  }

  const handleDeleteClick = (event: MouseEvent<HTMLButtonElement>, id: string) => {
    event.stopPropagation()
    if (confirm("削除してもよろしいでしょうか？")) {
      setLoadingFlags((flags) => ({ ...flags, [id]: true }))
      deleteTodoMutation
        .mutateAsync({ id })
        .catch((error) => {
          console.error("An error occurred during deletion: ", error)
        })
        .finally(() => {
          setLoadingFlags((flags) => ({ ...flags, [id]: false }))
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
    setCurrentPage(1)
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
    setCurrentPage(1)
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
