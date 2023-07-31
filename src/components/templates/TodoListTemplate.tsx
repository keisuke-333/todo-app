import type { Todo } from "@prisma/client"
import type { ChangeEvent, KeyboardEvent } from "react"

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
  handleDeleteClick: (id: string) => void
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
}: Props) => {
  return (
    <div className="flex h-[360px] w-[300px] flex-col gap-2">
      {currentItems?.length > 0 ? (
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
        />
      ) : (
        <p className="text-center text-lg text-gray-500">No todos found.</p>
      )}
    </div>
  )
}
