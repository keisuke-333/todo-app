import type { FormEvent } from "react"
import { useState } from "react"
import { toast } from "react-hot-toast"

import { useMutateTodo } from "@/hooks/useMutateTodo"
import { isNotEmpty, isValidLength } from "@/utils/validation"

export const useCreateTodo = () => {
  const [title, setTitle] = useState("")
  const [isPosting, setIsPosting] = useState(false)

  const { createTodoMutation } = useMutateTodo()

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

  return {
    title,
    setTitle,
    isPosting,
    handleCreateTodo,
  }
}
