import { Channel, Server } from "@chat-up-socket/shared"
import { HydratedDocument } from "mongoose"
import { createChannel } from "../models/channel"
import { createServer, getServerChannels } from "../models/server"
import { findUserById, updateUser } from "../models/user"

export const addNewServer = async (
  name: string,
  userId: string
): Promise<Server> => {
  const newServer = await createServer({ name, owner: userId })
  await createChannel({ name: "default", server: newServer._id.toString() })
  await updateUser(userId, { $addToSet: { servers: newServer._id } })
  return newServer.toObject()
}

export const findAllUserServers = async (userId: string): Promise<Server[]> => {
  const user = await findUserById(userId)
  const populatedUser = await user!.populate<{
    servers: HydratedDocument<Server>[]
  }>("servers")
  const servers = populatedUser.servers.map((server) => server.toObject())
  return servers
}

export const findAllServerChannels = async (
  serverId: string
): Promise<Channel[]> => {
  const channels = await getServerChannels(serverId)
  return channels.map((channel) => channel.toObject())
}
