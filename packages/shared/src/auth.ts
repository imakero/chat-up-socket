import { Request } from "express"

export interface ParamsDictionary {
  [key: string]: string
}

export interface JwtRequest<
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = qs.ParsedQs,
  Locals extends Record<string, any> = Record<string, any>
> extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
  jwt?: TokenPayload
}

export type TokenPayload = {
  sub: string
  username: string
  userId: string
}
