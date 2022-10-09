import { Channel } from "@chat-up-socket/shared"
import { createChannel } from "../models/channel"
import ServerModel, { findServerById } from "../models/server"

export const addNewChannel = async (
  name: string,
  serverId: string,
  userId: string
): Promise<Channel> => {
  const server = await findServerById(serverId)
  if (!server) {
    throw new Error("Server not found")
  }
  if (server.owner.toString() !== userId) {
    throw new Error("Only the owner can create new channels")
  }
  return (await createChannel({ name, server: serverId })).toObject()
}
