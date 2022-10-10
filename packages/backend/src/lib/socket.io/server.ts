import {
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData,
} from "@chat-up-socket/shared/"
import { Server } from "socket.io"
import http from "http"
import { socketAuth } from "./middleware"
import { findAllUserServers } from "../../services/serversServices"
import { getChannel } from "../../services/channelsServices"

interface ChatServerOptions {
  cors: {
    origin: string[] | string
  }
}

const startChatServer = (
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>,
  options: ChatServerOptions
) => {
  const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(server, options)

  io.use(socketAuth)

  io.on("connection", async (socket) => {
    const userId = socket.data.user!.userId
    const servers = await findAllUserServers(userId)
    const idIsDefined = (id: string | undefined): id is string => !!id
    const serverIds = servers
      .map((server) => server._id)
      .filter(idIsDefined)
      .map((id) => id.toString())
    socket.join(serverIds)

    console.log(`${socket.data.user?.username || "Unknown user"} connected`)

    socket.on("chatMessage", async ({ text, channelId }) => {
      console.log(
        `${socket.data.user?.username || "Unknown user"} sent a message`,
        text
      )
      const userId = socket.data.user?.userId
      const channel = await getChannel(channelId)
      if (!channel) {
        throw new Error("Channel not found")
      }
      const serverId = channel.server

      console.log(`Server: ${serverId}\nChannel: ${channelId}\nUser: ${userId}`)

      console.log(io.of("/").adapter.rooms)

      io.to(serverId.toString()).emit("chatMessage", {
        text,
        userId,
        channelId,
      })
    })

    socket.on("disconnect", (reason) =>
      console.log("A user disconnected:", reason)
    )
  })
}

export default startChatServer
