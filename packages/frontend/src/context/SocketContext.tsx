import React, { createContext, useRef } from "react"
import { io, Socket } from "socket.io-client"
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from "@chat-up-socket/shared"

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "ws://localhost:4000",
  {
    auth: {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzM2YmVjZDdmZDFmMTNmMjcyYjlhN2EiLCJ1c2VybmFtZSI6ImFjaGUiLCJpYXQiOjE2NjQ4ODQ5ODksImV4cCI6MTY2NDg4Njc4OSwic3ViIjoiNjMzNmJlY2Q3ZmQxZjEzZjI3MmI5YTdhIn0.4q8eiP_uEc7YfLUZI5ZOhtDM7BC6gcS4QS8ZMRUsbds",
    },
    autoConnect: false,
  }
)

type SocketContextType = Socket<ServerToClientEvents, ClientToServerEvents>

export const SocketContext = createContext<SocketContextType>(socket)

export const SocketProvider = ({ children }: React.PropsWithChildren) => {
  const socketRef = useRef(socket)

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  )
}
