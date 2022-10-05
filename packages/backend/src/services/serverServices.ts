import { Server } from "@chat-up-socket/shared"
import { createServer } from "../models/server"
import { updateUser } from "../models/user"

export const addNewServer = async (
  server: Server,
  userId: string
): Promise<Server> => {
  const newServer = await createServer(server)
  await updateUser(userId, { $addToSet: { servers: newServer._id } })
  return newServer.toObject()
}
