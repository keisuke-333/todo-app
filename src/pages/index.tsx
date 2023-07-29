import { useState } from "react"

import { api } from "@/utils/api"

const HomePage = () => {
  const [title, setTitle] = useState("")
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [editText, setEditText] = useState("")
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")

  const { isLoading, error, data, refetch } = api.todo.fetch.useQuery()

  const createMutation = api.todo.create.useMutation({
    onSuccess: () => {
      refetch().catch((error) => {
        console.error("An error occurred during refetch: ", error)
      })
    },
  })

  const updateTitleMutation = api.todo.updateTitle.useMutation({
    onSuccess: () => {
      refetch().catch((error) => {
        console.error("An error occurred during refetch: ", error)
      })
    },
  })

  const updateIsCompletedMutation = api.todo.updateIsCompleted.useMutation({
    onSuccess: () => {
      refetch().catch((error) => {
        console.error("An error occurred during refetch: ", error)
      })
    },
  })

  const deleteMutation = api.todo.delete.useMutation({
    onSuccess: () => {
      refetch().catch((error) => {
        console.error("An error occurred during refetch: ", error)
      })
    },
  })

  const handleCreateTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (title.trim() === "") {
      return
    }
    createMutation
      .mutateAsync({ title })
      .then(() => {
        setTitle("")
      })
      .catch((error) => {
        console.error("An error occurred: ", error)
      })
  }

  const handleCheckboxClick = (
    event: React.MouseEvent<HTMLInputElement>,
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

  const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      deleteMutation.mutateAsync({ id }).catch((error) => {
        console.error("An error occurred during deletion: ", error)
      })
    }
  }

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

      {filteredData?.map((todo) => (
        <div
          key={todo.id}
          className="mb-2 flex w-[300px] cursor-pointer items-center border px-4 py-2 shadow hover:bg-slate-100"
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
            <p className={`mx-4 grow ${todo.isCompleted ? "text-gray-300" : ""}`}>{todo.title}</p>
          )}
          <button
            className="rounded bg-red-500 p-2 text-white hover:bg-red-700"
            onClick={() => handleDeleteClick(todo.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </main>
  )
}

export default HomePage
