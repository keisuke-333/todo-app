import type { ChangeEvent } from "react"

type Props = {
  checked: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const TodoCheckbox = ({ checked, onChange }: Props) => (
  <div onClick={(e) => e.stopPropagation()} className="flex flex-col justify-center">
    <input
      type="checkbox"
      className="h-5 w-5 cursor-pointer"
      checked={checked}
      onChange={onChange}
    />
  </div>
)
