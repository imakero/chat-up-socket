import { JwtRequest, TokenPayload } from "@chat-up-socket/shared"
import { NextFunction, Response } from "express"
import jwt from "jsonwebtoken"

export const authenticateToken = (
  req: JwtRequest,
  res: Response,
  next: NextFunction
) => {
  const token: string | undefined = req.header("authorization")?.split(" ")[1]

  if (token) {
    try {
      const secret = process.env.JWT_SECRET
      if (!secret) {
        throw new Error("No jwt secret set")
      }
      const decoded = jwt.verify(token, secret) as TokenPayload
      req.jwt = decoded
    } catch (err) {
      return res.sendStatus(403) // Bad token!
    }
  } else {
    return res.sendStatus(401) // No token! Unauthorized!
  }

  next()
}
