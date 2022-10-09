import { JwtRequest, Channel } from "@chat-up-socket/shared"
import { Router } from "express"
import { addNewChannel } from "../services/channelsServices"
import {
  addNewServer,
  findAllServerChannels,
  findAllUserServers,
} from "../services/serversServices"

const channelsRouter = Router({ mergeParams: true })

channelsRouter.post(
  "/",
  async (
    req: JwtRequest<{ serverId: string }, Channel, { name: string }, {}>,
    res
  ) => {
    const { name } = req.body
    try {
      // Using the bang operator to assure typescript that req.jwt exist
      // (if it didn't exist it would not have passed the authenticateToken
      // middleware).
      const channel = await addNewChannel(
        name,
        req.params.serverId,
        req.jwt!.userId
      )
      res.status(201).json(channel)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
      res.sendStatus(400)
    }
  }
)

channelsRouter.get(
  "/",
  async (req: JwtRequest<{ serverId: string }, {}, Channel[], {}>, res) => {
    try {
      const channels = await findAllServerChannels(req.params.serverId)
      res.status(200).json(channels)
    } catch (error) {
      res.sendStatus(400)
    }
  }
)

export default channelsRouter
