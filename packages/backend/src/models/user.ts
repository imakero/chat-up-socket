import mongoose, {
  Document as MongooseDocument,
  HydratedDocument,
  Model,
  UpdateQuery,
} from "mongoose"
import bcrypt from "bcrypt"
import { Credentials, User } from "@chat-up-socket/shared"

interface UserModel extends Model<User> {
  login(credentials: Credentials): Promise<User & MongooseDocument>
}

const UserSchema = new mongoose.Schema<User & Credentials, UserModel>({
  username: { type: String, required: true, unique: true, lowercase: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },
  servers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Server" }],
})

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

UserSchema.statics.login = async function ({
  username,
  password,
}: Credentials) {
  const user = await this.findOne({ username }).select("+password")
  if (user?.password && (await bcrypt.compare(password, user.password))) {
    user.set("password", undefined)
    return user
  } else {
    throw new Error("Could not log in user")
  }
}

export const UserModel = mongoose.model<User & Credentials, UserModel>(
  "User",
  UserSchema
)

export const performLogin = async (
  credentials: Credentials
): Promise<User & MongooseDocument> => {
  const user = await UserModel.login(credentials)
  return user
}

export const createUser = async (user: User & Credentials): Promise<void> => {
  const newUser = new UserModel(user)
  newUser.save()
}

export const findUserById = async (
  userId: string
): Promise<HydratedDocument<User> | null> => {
  return UserModel.findById(userId)
}

export const updateUser = async (
  userId: string,
  update: UpdateQuery<User>
): Promise<HydratedDocument<User> | null> => {
  return UserModel.findByIdAndUpdate(userId, update, { new: true })
}
