import type { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction } from "react"
import { useState } from "react"
import { toast } from "react-hot-toast"

import { useMutateTodo } from "@/hooks/useMutateTodo"
import { isNotEmpty, isValidLength } from "@/utils/validation"

export const useEditTodo = (setLoadingFlags: Dispatch<SetStateAction<Record<string, boolean>>>) => {
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null)
  const [editText, setEditText] = useState("")
  const [originalText, setOriginalText] = useState("")
  // const [loadingFlags, setLoadingFlags] = useState<Record<string, boolean>>({})
  const { updateTitleMutation, updateIsCompletedMutation } = useMutateTodo()

  const handleEditChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEditText(event.target.value)
  }

  const handleStartEdit = (id: string, title: string) => {
    setEditingTodoId(id)
    setEditText(title)
    setOriginalText(title)
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

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>, id: string) => {
    if (event.key === "Enter") {
      handleEndEdit(id)
    } else if (event.key === "Escape") {
      setEditingTodoId(null)
      setEditText("")
    }
  }

  return {
    editingTodoId,
    editText,
    // loadingFlags,
    handleEditChange,
    handleStartEdit,
    handleEndEdit,
    handleCheckboxClick,
    handleKeyDown,
  }
}
