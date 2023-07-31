import type { FormEvent } from "react"
import { useState } from "react"

import { useMutateTodo } from "@/hooks/useMutateTodo"

export const TodoAddInput = () => {
  const [title, setTitle] = useState("")
  const { createTodoMutation } = useMutateTodo()

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

  return (
    <form onSubmit={handleCreateTodo}>
      <input
        type="text"
        className="mb-2 w-[300px] rounded border px-3 py-2 shadow hover:border-gray-400"
        placeholder="Add a new todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </form>
  )
}
