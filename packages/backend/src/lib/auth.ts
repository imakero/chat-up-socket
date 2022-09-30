import { User } from "@chat-up-socket/shared"
import jwt from "jsonwebtoken"
import { Document as MongooseDocument } from "mongoose"

export const generateToken = (user: User & MongooseDocument): string => {
  if (!user._id || !process.env.JWT_SECRET) {
    throw new Error("Could not generate token")
  }
  const userId = user._id.toString()

  const token = jwt.sign(
    { userId, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "24 h",
      subject: userId,
    }
  )
  return token
}
