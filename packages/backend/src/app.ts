import express, { Application, json, Request, Response } from "express"
import http from "http"
import cors from "cors"
import { setupDb } from "./lib/db"
import authRouter from "./routers/auth"
import dotenv from "dotenv"
import startChatServer from "./lib/socket.io/server"
dotenv.config()

const PORT: number = parseInt(process.env.SERVER_PORT || "3001")
const MONGODB_URL: string =
  process.env.MONGODB_URL || "mongodb://localhost:27017/chat-up-socket"
const FRONTENT_ORIGIN: string =
  process.env.FRONTEND_ORIGIN || "http://localhost:3000"

const app: Application = express()
const server = http.createServer(app)
startChatServer(server, {
  cors: {
    origin: [FRONTENT_ORIGIN],
  },
})

app.use(cors())
app.use(json())

app.use("/api/1.0/auth", authRouter)

server.listen(PORT, async () => {
  await setupDb(MONGODB_URL)
  return console.log(`listening on port ${PORT}`)
})
