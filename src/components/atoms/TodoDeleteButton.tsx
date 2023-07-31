import type { MouseEventHandler } from "react"

type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>
}

export const TodoDeleteButton = ({ onClick }: Props) => {
  return (
    <button className="rounded bg-red-500 p-2 text-white hover:bg-red-700" onClick={onClick}>
      Delete
    </button>
  )
}
