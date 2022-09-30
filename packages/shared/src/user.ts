import { Model } from "mongoose"

export interface User {
  _id?: string
  username: string
  email: string
  password?: string
}

export interface Credentials {
  username: string
  password: string
}

export interface Token {
  token: string
}
