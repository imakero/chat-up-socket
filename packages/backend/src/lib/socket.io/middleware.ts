import { DecodedJwt, SocketMiddleware } from "@chat-up-socket/shared"
import jwt from "jsonwebtoken"

export const socketAuth: SocketMiddleware = (socket, next) => {
  const token: string | undefined = socket.handshake.auth?.token
  if (token && process.env.JWT_SECRET) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const { username, userId } = decoded as DecodedJwt
      socket.data.user = { username, userId }
      next()
    } catch (error) {
      if (error instanceof Error) {
        console.log("There was an error decoding the token:", error.message)
      }
      next(new Error("Authentication error"))
    }
  } else {
    next(new Error("Authentication error"))
  }
}
