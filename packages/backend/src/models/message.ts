import { Message } from "@chat-up-socket/shared"
import mongoose, { Model } from "mongoose"

const MessageSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
      required: true,
    },
  },
  { timestamps: true }
)

const MessageModel = mongoose.model<Message, Model<Message>>(
  "Message",
  MessageSchema
)

export const createMessage = async (message: Message): Promise<void> => {
  const newMessage = new MessageModel(message)
  newMessage.save()
}

export default MessageModel
