import { Server } from "@chat-up-socket/shared"
import { createServer } from "../models/server"
import { findUserById, updateUser } from "../models/user"

export const addNewServer = async (
  server: Server,
  userId: string
): Promise<Server> => {
  const newServer = await createServer(server)
  await updateUser(userId, { $addToSet: { servers: newServer._id } })
  return newServer.toObject()
}

export const findAllUserServers = async (userId: string): Promise<Server[]> => {
  const user = await findUserById(userId)
  const populatedUser = await user!.populate<{ servers: Server[] }>("servers")
  return populatedUser.servers
}
