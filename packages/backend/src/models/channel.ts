import mongoose, { HydratedDocument, Model } from "mongoose"
import { Channel } from "@chat-up-socket/shared"

const ChannelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    server: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
      required: true,
    },
  },
  { timestamps: true }
)

const ChannelModel = mongoose.model<Channel, Model<Channel>>(
  "Channel",
  ChannelSchema
)

export const createChannel = async (
  channel: Channel
): Promise<HydratedDocument<Channel>> => {
  const newChannel = new ChannelModel(channel)
  await newChannel.save()
  return newChannel
}

export default ChannelModel
