import type { Dispatch, FormEvent, SetStateAction } from "react"

import { Spinner } from "./Spinner"

type Props = {
  title: string
  setTitle: Dispatch<SetStateAction<string>>
  handleCreateTodo: (event: FormEvent<HTMLFormElement>) => void
  isPosting: boolean
}

export const TodoAddInput = ({ title, setTitle, handleCreateTodo, isPosting }: Props) => {
  return (
    <>
      {isPosting ? (
        <Spinner height="h-4" width="w-4" />
      ) : (
        <form onSubmit={handleCreateTodo}>
          <input
            type="text"
            className="mb-2 w-[300px] rounded border px-3 py-2 shadow hover:border-gray-400"
            placeholder="Add a new todo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </form>
      )}
    </>
  )
}
