import express, { Application, json, Request, Response } from "express"
import http from "http"
import cors from "cors"
import { Server } from "socket.io"
import dotenv from "dotenv"
import {
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData,
} from "@chat-up-socket/shared/"
dotenv.config()

const app: Application = express()
const server = http.createServer(app)
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
  },
})

app.use(cors())
app.use(json())
const PORT: number = parseInt(process.env.SERVER_PORT || "3001")

app.get("/", (req: Request, res: Response) => {
  return res.send(`hello world`)
})

io.on("connection", (socket) => {
  console.log("a user connected")
  socket.on("chatMessage", (data) => {
    console.log("a user sent a message", data.message)
    io.emit("chatMessage", { ...data })
  })
})

server.listen(PORT, () => console.log(`listening on port ${PORT}`))
