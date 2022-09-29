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

export interface SocketData {}
