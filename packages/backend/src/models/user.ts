import mongoose from "mongoose"
import bcrypt from "bcrypt"
import { Password, User } from "@chat-up-socket/shared"

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, lowercase: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },
})

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

UserSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username }).select("+password")
  if (user && (await bcrypt.compare(password, user.password))) {
    return user
  } else {
    throw new Error("Could not log in user")
  }
}

const UserModel = mongoose.model<User>("User", UserSchema)

export const createUser = async (user: User & Password): Promise<void> => {
  const newUser = new UserModel(user)
  newUser.save()
}
