export default (number: number = 8): string => {
  const digits = '0123456789'
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  let randomValue = ''
  for (let i = 0; i < number; i++) {
    randomValue +=
      i < 6 ? digits[Math.floor(Math.random() * 10)] : letters[Math.floor(Math.random() * 52)]
  }
  return randomValue
}
