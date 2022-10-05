import { Server } from "@chat-up-socket/shared"
import mongoose, { HydratedDocument, Model } from "mongoose"

const ServerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
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

export default ServerModel
