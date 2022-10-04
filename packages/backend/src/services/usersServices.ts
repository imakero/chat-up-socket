import { User } from "@chat-up-socket/shared"
import { findUserById } from "../models/user"

export const getUser = async (userId: string): Promise<User | null> => {
  return findUserById(userId)
}
