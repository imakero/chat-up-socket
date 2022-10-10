import { Channel } from "@chat-up-socket/shared"
import { createChannel, findChannelById } from "../models/channel"
import { findServerById } from "../models/server"

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

export const getChannel = async (
  channelId: string
): Promise<Channel | null> => {
  const channel = await findChannelById(channelId)
  if (!channel) {
    return null
  } else return channel.toObject()
}
