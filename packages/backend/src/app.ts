import express, { Application, json, Request, Response } from "express"
import http from "http"
import cors from "cors"
import { Server } from "socket.io"
import { setupDb } from "./lib/db"
import {
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData,
} from "@chat-up-socket/shared/"
import dotenv from "dotenv"
import authRouter from "./routers/auth"
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
    origin: ["http://localhost:3000"],
  },
})

app.use(cors())
app.use(json())
const PORT: number = parseInt(process.env.SERVER_PORT || "3001")
const MONGODB_URL: string =
  process.env.MONGODB_URL || "mongodb://localhost:27017/chat-up-socket"

app.use("/api/1.0/auth", authRouter)

io.on("connection", (socket) => {
  console.log("a user connected")
  socket.on("chatMessage", (data) => {
    console.log("a user sent a message", data.message)
    io.emit("chatMessage", { ...data })
  })

  socket.on("disconnect", (reason) => console.log("A user disconnected"))
})

server.listen(PORT, async () => {
  await setupDb(MONGODB_URL)
  return console.log(`listening on port ${PORT}`)
})
