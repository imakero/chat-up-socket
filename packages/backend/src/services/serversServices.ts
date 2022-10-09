import { Channel, Server } from "@chat-up-socket/shared"
import { createChannel } from "../models/channel"
import { createServer, getServerChannels } from "../models/server"
import { findUserById, updateUser } from "../models/user"

export const addNewServer = async (
  name: string,
  userId: string
): Promise<Server> => {
  const newServer = await createServer({ name, owner: userId })
  await createChannel({ name: "Default", server: newServer._id.toString() })
  await updateUser(userId, { $addToSet: { servers: newServer._id } })
  return newServer.toObject()
}

export const findAllUserServers = async (userId: string): Promise<Server[]> => {
  const user = await findUserById(userId)
  const populatedUser = await user!.populate<{ servers: Server[] }>("servers")
  return populatedUser.servers
}

export const findAllServerChannels = async (
  serverId: string
): Promise<Channel[]> => {
  const channels = await getServerChannels(serverId)
  return channels.map((channel) => channel.toObject())
}
