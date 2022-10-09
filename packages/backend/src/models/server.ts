import { Channel, Server } from "@chat-up-socket/shared"
import mongoose, { HydratedDocument, Model } from "mongoose"
import ChannelModel from "./channel"

const ServerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
)

const ServerModel = mongoose.model<Server, Model<Server>>(
  "Server",
  ServerSchema
)

export const createServer = async (
  server: Server
): Promise<HydratedDocument<Server>> => {
  const newServer = new ServerModel(server)
  await newServer.save()
  return newServer
}

export const getServerChannels = async (
  serverId: string
): Promise<HydratedDocument<Channel>[]> => {
  return await ChannelModel.find({ server: serverId })
}

export const findServerById = async (
  serverId: string
): Promise<HydratedDocument<Server> | null> => {
  return await ServerModel.findById(serverId)
}

export default ServerModel
