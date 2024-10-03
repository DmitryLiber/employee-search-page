interface IEmployee {
  name: string
  email: string
  phone: string
}

interface IMsg {
  text: string
  status: 'success' | 'warning' | 'error'
  id?: string
}

export { type IEmployee, type IMsg }
