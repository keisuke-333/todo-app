import type { ChangeEvent, FocusEvent, KeyboardEvent } from "react"

type Props = {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onBlur: (e: FocusEvent<HTMLInputElement>) => void
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
}

export const TodoEditInput = ({ value, onChange, onBlur, onKeyDown }: Props) => (
  <input
    type="text"
    className="mx-4 w-[182px] p-1"
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    onKeyDown={onKeyDown}
    autoFocus
  />
)
