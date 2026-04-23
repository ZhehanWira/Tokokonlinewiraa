export interface GetMe {
  success: boolean
  message: string
  data: Data
}

export interface Data {
  id: number
  user_id: number
  name: string
  phone: string
  owner_token: string
  createdAt: string
  updatedAt: string
  user: User
}

export interface User {
  id: number
  username: string
  password: string
  role: string
  owner_token: string
  createdAt: string
  updatedAt: string
}