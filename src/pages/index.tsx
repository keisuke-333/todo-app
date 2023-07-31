import type { ChangeEvent, FormEvent, MouseEvent } from "react"
import { useState } from "react"

import { useMutateTodo } from "@/hooks/useMutateTodo"
import { api } from "@/utils/api"

const HomePage = () => {
  const [title, setTitle] = useState("")
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [editText, setEditText] = useState("")
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const { data } = api.todo.fetch.useQuery()
  const { createTodoMutation, updateTitleMutation, updateIsCompletedMutation, deleteTodoMutation } =
    useMutateTodo()

  const handleCreateTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (title.trim() === "") {
      return
    }
    createTodoMutation
      .mutateAsync({ title })
      .then(() => {
        setTitle("")
      })
      .catch((error) => {
        console.error("An error occurred: ", error)
      })
  }

  const handleCheckboxClick = (
    event: MouseEvent<HTMLInputElement>,
    id: string,
    isCompleted: boolean,
  ) => {
    event.stopPropagation()
    updateIsCompletedMutation
      .mutateAsync({ id, isCompleted: !isCompleted })
      .catch((error) => console.error("An error occurred during mutation: ", error))
  }

  const handleStartEdit = (id: string, title: string) => {
    setIsEditing(id)
    setEditText(title)
  }

  const handleEditChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEditText(event.target.value)
  }

  const handleEndEdit = (id: string) => {
    if (editText.trim() !== "") {
      updateTitleMutation.mutateAsync({ id, title: editText }).catch((error) => {
        console.error("An error occurred during mutation: ", error)
      })
    }
    setIsEditing(null)
    setEditText("")
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
      <form onSubmit={handleCreateTodo}>
        <input
          type="text"
          className="mb-2 w-[300px] rounded border px-3 py-2 shadow hover:border-gray-400"
          placeholder="Add a new todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </form>

      <div className="mb-4 flex w-[300px] items-center">
        <input
          type="text"
          className="mr-1 grow rounded-full border px-4 py-2 shadow hover:border-gray-400"
          placeholder="Search"
          onChange={handleSearchChange}
        />

        <select
          className="w-[75px] rounded border px-1 py-2 shadow hover:border-gray-400"
          defaultValue="all"
          onChange={handleFilterChange}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div className="flex h-[360px] w-[300px] flex-col gap-2">
        {(currentItems?.length ?? 0) > 0 ? (
          currentItems?.map((todo) => (
            <div
              key={todo.id}
              className="flex cursor-pointer items-center border px-4 py-2 shadow hover:bg-slate-100"
              onClick={() => handleStartEdit(todo.id, todo.title)}
            >
              <input
                type="checkbox"
                id="checkbox"
                className="h-5 w-5 cursor-pointer"
                checked={todo.isCompleted}
                onClick={(e) => handleCheckboxClick(e, todo.id, todo.isCompleted)}
              />
              {isEditing === todo.id ? (
                <input
                  type="text"
                  className="mx-4 w-[151px] p-1"
                  value={editText}
                  onChange={handleEditChange}
                  onBlur={() => handleEndEdit(todo.id)}
                  autoFocus={true}
                />
              ) : (
                <p className={`mx-4 grow ${todo.isCompleted ? "text-gray-300" : ""}`}>
                  {todo.title}
                </p>
              )}
              <button
                className="rounded bg-red-500 p-2 text-white hover:bg-red-700"
                onClick={() => handleDeleteClick(todo.id)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-lg text-gray-500">No todos found.</p>
        )}
      </div>

      <div className="mt-2">
        <p>
          {(filteredData?.length ?? 0) <= itemsPerPage
            ? `${filteredData?.length} todo`
            : `${currentPage === 1 ? 1 : (currentPage - 1) * itemsPerPage + 1} - ${
                currentPage * itemsPerPage > (filteredData?.length ?? 0)
                  ? filteredData?.length
                  : currentPage * itemsPerPage
              } of ${filteredData?.length}`}
        </p>
      </div>

      {(filteredData?.length ?? 0) > itemsPerPage && (
        <div className="mt-4 flex justify-center gap-2">
          <button
            className={`rounded-l px-2 py-1 text-sm font-bold text-gray-800 ${
              currentPage === 1 ? "cursor-not-allowed bg-gray-300" : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => currentPage > 1 && setCurrentPage((oldPage) => Math.max(oldPage - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          <button
            className={`rounded-r px-2 py-1 text-sm font-bold text-gray-800 ${
              currentPage === numPages
                ? "cursor-not-allowed bg-gray-300"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => setCurrentPage((oldPage) => Math.min(oldPage + 1, numPages))}
            disabled={currentPage === numPages}
          >
            Next
          </button>
        </div>
      )}
    </main>
  )
}

export default HomePage
