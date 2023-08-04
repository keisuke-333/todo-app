import type { Dispatch, FormEvent, SetStateAction } from "react"

type Props = {
  title: string
  setTitle: Dispatch<SetStateAction<string>>
  handleCreateTodo: (event: FormEvent<HTMLFormElement>) => void
}

export const TodoAddInput = ({ title, setTitle, handleCreateTodo }: Props) => (
  <form onSubmit={handleCreateTodo}>
    <input
      type="text"
      className="mb-2 w-[300px] rounded border px-3 py-2 shadow hover:border-gray-400"
      placeholder="Add a new todo"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  </form>
)
