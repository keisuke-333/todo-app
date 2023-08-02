import type { MouseEventHandler } from "react"

import { DeleteIcon } from "./icons/DeleteIcon"

type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>
}

export const TodoDeleteButton = ({ onClick }: Props) => {
  return (
    <button className="rounded bg-red-500 p-1 text-white hover:bg-red-700" onClick={onClick}>
      <DeleteIcon />
    </button>
  )
}
