import { User, Credentials, Token } from "@chat-up-socket/shared"
import { createUser, performLogin } from "../models/user"
import { generateToken } from "../lib/auth"

export const signupUser = async (user: User & Credentials): Promise<void> => {
  await createUser(user)
}

export const loginUser = async (
  credentials: Credentials
): Promise<{ user: User } & Token> => {
  const user = await performLogin(credentials)
  const token = generateToken(user)
  return { user: user.toObject(), token }
}
