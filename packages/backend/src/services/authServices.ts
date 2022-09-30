import { User, Password } from "@chat-up-socket/shared"
import { createUser } from "../models/user"

export const signupUser = async (user: User & Password): Promise<void> => {
  await createUser(user)
}
