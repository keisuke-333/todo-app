import type { Todo } from "@prisma/client"
import type { ChangeEvent, KeyboardEvent } from "react"

import { TodoCheckbox } from "../atoms/TodoCheckbox"
import { TodoDeleteButton } from "../atoms/TodoDeleteButton"
import { TodoEditInput } from "../atoms/TodoEditInput"

type Props = {
  todo: Todo
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

export const TodoItem = ({
  todo,
  editingTodoId,
  editText,
  handleCheckboxClick,
  handleStartEdit,
  handleEditChange,
  handleEndEdit,
  handleKeyDown,
  handleDeleteClick,
}: Props) => {
  const handleTodoClick = () => {
    handleStartEdit(todo.id, todo.title)
  }

  return (
    <div
      key={todo.id}
      className="flex cursor-pointer items-center border px-4 py-2 shadow hover:bg-slate-100"
      onClick={handleTodoClick}
    >
      <TodoCheckbox
        checked={todo.isCompleted}
        onChange={(e) => handleCheckboxClick(e, todo.id, todo.isCompleted)}
      />
      {editingTodoId === todo.id ? (
        <TodoEditInput
          value={editText}
          onChange={handleEditChange}
          onBlur={() => handleEndEdit(todo.id)}
          onKeyDown={(e) => handleKeyDown(e, todo.id)}
        />
      ) : (
        <p className={`mx-4 grow ${todo.isCompleted ? "text-gray-300" : ""}`}>{todo.title}</p>
      )}
      <TodoDeleteButton onClick={() => handleDeleteClick(todo.id)} />
    </div>
  )
}
