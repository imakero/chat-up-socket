import mongoose, { Model } from "mongoose"
import { Channel } from "@chat-up-socket/shared"

const ChannelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    server: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Channel", required: true },
    ],
  },
  { timestamps: true }
)

const ChannelModel = mongoose.model<Channel, Model<Channel>>(
  "Channel",
  ChannelSchema
)

const createChannel = async (channel: Channel): Promise<void> => {
  const newChannel = new ChannelModel(channel)
  newChannel.save()
}

export default ChannelModel
