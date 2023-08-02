import type { FormEvent } from "react"
import { useState } from "react"

import { useMutateTodo } from "@/hooks/useMutateTodo"

import { Spinner } from "./Spinner"

export const TodoAddInput = () => {
  const [title, setTitle] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { createTodoMutation } = useMutateTodo()

  const isValidLength = (title: string) => {
    const maxLength = 10
    return title.length <= maxLength
  }

  const handleCreateTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (title.trim() === "") {
      return
    }
    if (!isValidLength(title)) {
      alert("10文字以下で入力してください。")
      return
    }
    setIsLoading(true)
    createTodoMutation
      .mutateAsync({ title })
      .then(() => {
        setTitle("")
      })
      .catch((error) => {
        console.error("An error occurred: ", error)
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <>
      {isLoading ? (
        <Spinner height="h-4" width="w-4" />
      ) : (
        <form onSubmit={handleCreateTodo}>
          <input
            type="text"
            className="mb-2 w-[300px] rounded border px-3 py-2 shadow hover:border-gray-400"
            placeholder="Add a new todo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </form>
      )}
    </>
  )
}
