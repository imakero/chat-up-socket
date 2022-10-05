import { User, Credentials, Token } from "@chat-up-socket/shared"
import { Router } from "express"
import { loginUser, signupUser } from "../services/authServices"

const authRouter = Router()

interface Empty {}

authRouter.post<Empty, {}, User & Credentials, {}>(
  "/signup",
  async (req, res) => {
    const { username, email, password } = req.body
    try {
      await signupUser({ username, email, password, servers: [] })
      return res.sendStatus(201)
    } catch (e) {
      return res.sendStatus(400)
    }
  }
)

authRouter.post<Empty, { user: User } & Token, Credentials, {}>(
  "/login",
  async (req, res) => {
    const { username, password } = req.body
    try {
      return res.json(await loginUser({ username, password }))
    } catch (error) {
      return res.sendStatus(401)
    }
  }
)

export default authRouter
