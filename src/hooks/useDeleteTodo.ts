import type { Dispatch, MouseEvent, SetStateAction } from "react"

import { useMutateTodo } from "./useMutateTodo"

export const useDeleteTodo = (
  setLoadingFlags: Dispatch<SetStateAction<Record<string, boolean>>>,
  currentPage: number,
  setCurrentPage: Dispatch<SetStateAction<number>>,
  currentItemsLength: number,
) => {
  // const [loadingFlags, setLoadingFlags] = useState<Record<string, boolean>>({})
  const { deleteTodoMutation } = useMutateTodo()

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
      if (currentItemsLength === 1) {
        if (currentPage > 1) {
          setCurrentPage((oldPage) => oldPage - 1)
        } else {
          setCurrentPage(1)
        }
      }
    }
  }

  return {
    handleDeleteClick,
    // loadingFlags,
  }
}
