export default function <T>(func: (this: T | null, ...args: any[]) => void, timeout = 300) {
  let timer: number | undefined

  return (...args: any) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(null, args)
    }, timeout)
  }
}
