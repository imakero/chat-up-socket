import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { io, Socket } from "socket.io-client"
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from "@chat-up-socket/shared"

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "ws://localhost:4000"
)

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <App socket={socket} />
  </React.StrictMode>
)
