export default (value: number | string) => {
  return /^\d+$/.test(String(value))
}
