interface ResponseProps {
  status: number
  data?: any
  error?: unknown
}

export class Response<T> {
  public readonly status: number
  public readonly data?: T | T[]
  public readonly error?: unknown

  constructor ({ status, data, error }: ResponseProps) {
    this.status = status

    if (data !== null) {
      this.data = data
    }

    if (error !== null) {
      this.error = error
    }
  }
}
