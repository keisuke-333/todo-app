import Image from "next/image"
import type { MouseEventHandler } from "react"

type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>
}

export const TodoDeleteButton = ({ onClick }: Props) => (
  <button className="rounded bg-red-500 p-1 text-white hover:bg-red-700" onClick={onClick}>
    <Image src="/delete.svg" alt="delete" width={24} height={24} />
  </button>
)
