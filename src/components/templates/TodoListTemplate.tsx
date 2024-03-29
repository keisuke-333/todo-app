import type { Todo } from "@prisma/client"
import type { ChangeEvent, KeyboardEvent, MouseEvent } from "react"

import { Spinner } from "../atoms/Spinner"
import { TodoList } from "../organisms/TodoList"

type Props = {
  currentItems: Todo[]
  editingTodoId: string | null
  editText: string
  handleCheckboxClick: (
    event: ChangeEvent<HTMLInputElement>,
    id: string,
    isCompleted: boolean,
  ) => void
  handleStartEdit: (id: string, title: string) => void
  handleEditChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleEndEdit: (id: string) => void
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>, id: string) => void
  handleDeleteClick: (event: MouseEvent<HTMLButtonElement>, id: string) => void
  isLoading: boolean
  loadingFlags: Record<string, boolean>
}

export const TodoListTemplate = ({
  currentItems,
  editingTodoId,
  editText,
  handleCheckboxClick,
  handleStartEdit,
  handleEditChange,
  handleEndEdit,
  handleKeyDown,
  handleDeleteClick,
  isLoading,
  loadingFlags,
}: Props) => (
  <div className="flex h-[300px] w-[300px] flex-col items-center gap-2">
    {isLoading ? (
      <div className="flex h-full items-center">
        <Spinner />
      </div>
    ) : currentItems?.length > 0 ? (
      <TodoList
        todos={currentItems}
        editingTodoId={editingTodoId}
        editText={editText}
        handleCheckboxClick={handleCheckboxClick}
        handleStartEdit={handleStartEdit}
        handleEditChange={handleEditChange}
        handleEndEdit={handleEndEdit}
        handleKeyDown={handleKeyDown}
        handleDeleteClick={handleDeleteClick}
        loadingFlags={loadingFlags}
      />
    ) : (
      <p className="text-center text-lg text-gray-500">No todos found.</p>
    )}
  </div>
)
