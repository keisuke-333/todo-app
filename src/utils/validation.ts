export const isNotEmpty = (text: string): boolean => {
  return text.trim() !== ""
}

export const isValidLength = (title: string, maxLength = 10) => {
  return title.length <= maxLength
}
