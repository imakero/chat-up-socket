import { Server } from "./chat"

export interface User {
  _id?: string
  username: string
  email: string
  password?: string
  servers: string[]
}

export interface Credentials {
  username: string
  password: string
}

export interface Token {
  token: string
}
