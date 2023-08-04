import type { Todo } from "@prisma/client"
import type { ChangeEvent, KeyboardEvent, MouseEvent } from "react"

import { Spinner } from "../atoms/Spinner"
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
  handleDeleteClick: (event: MouseEvent<HTMLButtonElement>, id: string) => void
  isLoading: boolean
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
  isLoading,
}: Props) => (
  <div
    key={todo.id}
    className="flex w-full cursor-pointer items-center border px-4 py-2 shadow hover:bg-slate-100"
    onClick={() => {
      handleStartEdit(todo.id, todo.title)
    }}
  >
    {isLoading ? (
      <div className="mx-auto">
        <Spinner margin="my-2" height="h-5" width="w-5" />
      </div>
    ) : (
      <>
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
        <TodoDeleteButton onClick={(e) => handleDeleteClick(e, todo.id)} />
      </>
    )}
  </div>
)
