import { api } from "@/utils/api"

export const useMutateTodo = () => {
  const { refetch } = api.todo.fetch.useQuery()

  const handleSuccess = () => {
    refetch().catch((error) => {
      console.error("An error occurred during refetch: ", error)
    })
  }

  const createTodoMutation = api.todo.create.useMutation({
    onSuccess: handleSuccess,
  })

  const updateTitleMutation = api.todo.updateTitle.useMutation({
    onSuccess: handleSuccess,
  })

  const updateIsCompletedMutation = api.todo.updateIsCompleted.useMutation({
    onSuccess: handleSuccess,
  })

  const deleteTodoMutation = api.todo.delete.useMutation({
    onSuccess: handleSuccess,
  })

  return {
    createTodoMutation,
    updateTitleMutation,
    updateIsCompletedMutation,
    deleteTodoMutation,
  }
}
