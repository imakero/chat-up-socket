import { Request } from "express"

export interface JwtRequest extends Request {
  jwt?: TokenPayload
}

export type TokenPayload = {
  sub: string
  username: string
  userId: string
}
