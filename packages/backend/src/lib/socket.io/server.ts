import {
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData,
} from "@chat-up-socket/shared/"
import { Server, Socket } from "socket.io"
import http from "http"
import { socketAuth } from "./middleware"

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

  io.on("connection", (socket) => {
    console.log(`${socket.data.user?.username || "Unknown user"} connected`)
    socket.on("chatMessage", (data) => {
      console.log(
        `${socket.data.user?.username || "Unknown user"} sent a message`,
        data.message
      )
      io.emit("chatMessage", { ...data })
    })

    socket.on("disconnect", (reason) =>
      console.log("A user disconnected:", reason)
    )
  })
}

export default startChatServer
