type ApiResponse<T = any> = {
  payload?: T
  error?: string
}

export default ApiResponse
