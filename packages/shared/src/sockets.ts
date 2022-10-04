import { Socket } from "socket.io"
import { ExtendedError } from "socket.io/dist/namespace"

interface Message {
  message: string
}

export interface ServerToClientEvents {
  chatMessage: (message: Message) => void
}

export interface ClientToServerEvents {
  chatMessage: (message: Message) => void
  join: (room: string) => void
}

export interface InterServerEvents {}

export interface SocketData {
  user?: SocketUser
}

export interface SocketUser {
  username: string
  userId: string
}

export type SocketMiddleware = (
  socket: Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >,
  next: (err?: ExtendedError | undefined) => void
) => void
