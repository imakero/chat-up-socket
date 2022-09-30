import { User, Password } from "@chat-up-socket/shared"
import { Router } from "express"
import { signupUser } from "../services/authServices"

const authRouter = Router()

interface Empty {}

authRouter.post<Empty, {}, User & Password, {}>("/signup", async (req, res) => {
  const { username, email, password } = req.body
  try {
    await signupUser({ username, email, password })
    return res.sendStatus(201)
  } catch (e) {
    return res.sendStatus(400)
  }
})

export default authRouter
