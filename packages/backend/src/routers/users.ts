import { User, Credentials, Token, JwtRequest } from "@chat-up-socket/shared"
import { Response, Router } from "express"
import { getUser } from "../services/usersServices"

const usersRouter = Router()

interface Empty {}

usersRouter.get(
  "/me",
  async (
    req: JwtRequest,
    res: Response<{ user: User } | { error: string }>
  ) => {
    if (!req.jwt)
      throw new Error(
        "req.jwt not set despite passing auth middleware. This should be impossible."
      )

    try {
      const user = await getUser(req.jwt.userId)
      if (user) {
        return res.status(200).json({ user })
      } else {
        return res.status(404).json({ error: "User not found" })
      }
    } catch (e) {
      return res
        .status(400)
        .json({ error: "There was an error while trying to find the user" })
    }
  }
)

export default usersRouter
