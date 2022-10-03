import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { io, Socket } from "socket.io-client"
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from "@chat-up-socket/shared"
import { ChakraProvider } from "@chakra-ui/react"

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "ws://localhost:4000",
  {
    auth: {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzM2YmVjZDdmZDFmMTNmMjcyYjlhN2EiLCJ1c2VybmFtZSI6ImFjaGUiLCJpYXQiOjE2NjQ3ODY2MDksImV4cCI6MTY2NDg3MzAwOSwic3ViIjoiNjMzNmJlY2Q3ZmQxZjEzZjI3MmI5YTdhIn0.69Vj7SXsW6ZmsjEUeBfV5kMcdPGMeigRC227VLG8mGM",
    },
  }
)

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <App socket={socket} />
    </ChakraProvider>
  </React.StrictMode>
)
