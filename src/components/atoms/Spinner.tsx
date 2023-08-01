type Props = {
  margin?: string
  height?: string
  width?: string
}

export const Spinner = ({ margin = "my-5", height = "h-8", width = "w-8" }: Props) => {
  return (
    <div
      className={`${margin} ${height} ${width} animate-spin rounded-full border-2 border-pink-600 border-t-transparent`}
    ></div>
  )
}
