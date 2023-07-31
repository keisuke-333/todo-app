import type { ChangeEvent, FocusEvent, KeyboardEvent } from "react"

type Props = {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onBlur: (e: FocusEvent<HTMLInputElement>) => void
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
}

export const TodoEditInput = ({ value, onChange, onBlur, onKeyDown }: Props) => {
  return (
    <input
      type="text"
      className="mx-4 w-[151px] p-1"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      autoFocus
    />
  )
}
