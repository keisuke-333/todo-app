import { useState } from "react"

import { api } from "@/utils/api"

const HomePage = () => {
  const [title, setTitle] = useState("")

  const { isLoading, error, data, refetch } = api.todo.fetch.useQuery()

  const createMutation = api.todo.create.useMutation({
    onSuccess: () => {
      refetch().catch((error) => {
        console.error("An error occurred during refetch: ", error)
      })
    },
  })

  const updateMutation = api.todo.update.useMutation({
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

  const handleCheckboxChange = (id: string, isCompleted: boolean) => {
    updateMutation
      .mutateAsync({ id, isCompleted: !isCompleted })
      .catch((error) => console.error("An error occurred during mutation: ", error))
  }

  const handleDeleteClick = (id: string) => {
    if (confirm("削除してもよろしいでしょうか？")) {
      deleteMutation.mutateAsync({ id }).catch((error) => {
        console.error("An error occurred during deletion: ", error)
      })
    }
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
        />

        <select
          className="w-[75px] rounded border px-1 py-2 shadow hover:border-gray-400"
          defaultValue="all"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="done">Done</option>
        </select>
      </div>

      {data?.map((todo) => (
        <div
          key={todo.id}
          className="mb-2 flex w-[300px] cursor-pointer items-center border px-4 py-2 shadow hover:bg-slate-100"
        >
          <input
            type="checkbox"
            id="checkbox"
            className="h-5 w-5 cursor-pointer"
            checked={todo.isCompleted}
            onChange={() => handleCheckboxChange(todo.id, todo.isCompleted)}
          />
          <p className="mx-4 grow">{todo.title}</p>
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
