import type { Todo } from "@prisma/client"
import type { ChangeEvent, KeyboardEvent, MouseEvent } from "react"

import { TodoItem } from "../molecules/TodoItem"

type Props = {
  todos: Todo[]
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
  loadingFlags: Record<string, boolean>
}

export const TodoList = ({
  todos,
  editingTodoId,
  editText,
  handleCheckboxClick,
  handleStartEdit,
  handleEditChange,
  handleEndEdit,
  handleKeyDown,
  handleDeleteClick,
  loadingFlags,
}: Props) => {
  return (
    <>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          editingTodoId={editingTodoId}
          editText={editText}
          handleCheckboxClick={handleCheckboxClick}
          handleStartEdit={handleStartEdit}
          handleEditChange={handleEditChange}
          handleEndEdit={handleEndEdit}
          handleKeyDown={handleKeyDown}
          handleDeleteClick={handleDeleteClick}
          isLoading={loadingFlags[todo.id] ?? false}
        />
      ))}
    </>
  )
}
