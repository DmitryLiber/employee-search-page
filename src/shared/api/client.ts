import { BACKEND_BASE_URL } from '../config'

class Client {
  async get(
    params: string,
    nextSuccess?: (res: any) => void,
    nextError?: (err: any) => void,
    nextFinally?: () => void
  ) {
    try {
      const response = await fetch(`${BACKEND_BASE_URL}${params || ''}`).then((res) => res.json())

      if (response) {
        if (nextSuccess) nextSuccess(response)
      }
    } catch (err) {
      if (nextError) nextError(err)
    } finally {
      if (nextFinally) nextFinally()
    }
  }
}
const client = new Client()

export default client
