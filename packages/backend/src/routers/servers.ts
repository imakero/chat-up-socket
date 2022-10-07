import { JwtRequest, Server } from "@chat-up-socket/shared"
import { Router } from "express"
import { addNewServer, findAllUserServers } from "../services/serverServices"

const serversRouter = Router()

serversRouter.post("/", async (req: JwtRequest<{}, {}, Server, {}>, res) => {
  const { name } = req.body
  try {
    // Using the bang operator to assure typescript that req.jwt exist
    // (if it didn't exist it would not have passed the authenticateToken
    // middleware).
    const server = await addNewServer({ name }, req.jwt!.userId)
    res.status(201).json(server)
  } catch (error) {
    res.sendStatus(400)
  }
})

serversRouter.get("/", async (req: JwtRequest<{}, {}, Server[], {}>, res) => {
  try {
    const servers = await findAllUserServers(req.jwt!.userId)
    res.status(200).json(servers)
  } catch (error) {
    res.sendStatus(400)
  }
})

export default serversRouter
