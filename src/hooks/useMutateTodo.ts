import { toast } from "react-hot-toast"

import { api } from "@/utils/api"

export const useMutateTodo = () => {
  const ctx = api.useContext()

  const createTodoMutation = api.todo.create.useMutation({
    onSuccess: () => {
      void ctx.todo.fetch.invalidate()
      toast.success("Todoを作成しました")
    },
    onError: (error: unknown) => {
      console.error("Todo作成時にエラーが発生しました: ", error)
      toast.error("Todo作成時にエラーが発生しました。後でもう一度お試しください。")
    },
  })

  const updateTitleMutation = api.todo.updateTitle.useMutation({
    onSuccess: () => {
      void ctx.todo.fetch.invalidate()
      toast.success("Todoを更新しました")
    },
    onError: (error: unknown) => {
      console.error("Todoタイトル更新時にエラーが発生しました: ", error)
      toast.error("Todo更新時にエラーが発生しました。後でもう一度お試しください。")
    },
  })

  const updateIsCompletedMutation = api.todo.updateIsCompleted.useMutation({
    onSuccess: () => {
      void ctx.todo.fetch.invalidate()
      toast.success("Todoの状態を更新しました")
    },
    onError: (error: unknown) => {
      console.error("Todo状態更新時にエラーが発生しました: ", error)
      toast.error("Todo状態更新時にエラーが発生しました。後でもう一度お試しください。")
    },
  })

  const deleteTodoMutation = api.todo.delete.useMutation({
    onSuccess: () => {
      void ctx.todo.fetch.invalidate()
      toast.success("Todoを削除しました")
    },
    onError: (error: unknown) => {
      console.error("Todo削除時にエラーが発生しました: ", error)
      toast.error("Todo削除時にエラーが発生しました。後でもう一度お試しください。")
    },
  })

  return {
    createTodoMutation,
    updateTitleMutation,
    updateIsCompletedMutation,
    deleteTodoMutation,
  }
}
