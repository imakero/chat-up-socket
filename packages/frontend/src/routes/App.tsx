import {
  Box,
  Button,
  Container,
  FormControl,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { SocketContext } from "../context/SocketContext"
import { UserContext } from "../context/UserContext"
import { getAuthToken } from "../lib/auth"

function App() {
  const { user, loading } = useContext(UserContext)
  const [message, setMessage] = useState<string>("")
  const [messages, setMessages] = useState<string[]>([])
  const socket = useContext(SocketContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user && !getAuthToken()) {
      navigate("/login")
    } else if (!loading && user) {
      socket.auth = { token: getAuthToken() }
      socket.connect()

      socket.on("chatMessage", ({ message }) => {
        setMessages((messages) => [...messages, message])
      })

      socket.on("connect_error", (error) => {
        console.error(error.message)
      })

      const anyListener = (event: any, ...args: any) => {
        console.log("onAny: \n", event, args)
      }

      if (socket.listenersAny().length === 0) {
        socket.onAny(anyListener)
      }

      return () => {
        socket.off("chatMessage")
        socket.off("connect_error")
        socket.offAny(anyListener)
      }
    }
  }, [socket, loading, user, navigate])

  const handleSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault()
    socket?.emit("chatMessage", { message })
    setMessage("")
  }

  return (
    <Container size="xl" height="100vh" py={4}>
      <VStack height="100%" alignItems="start" w="100%">
        <VStack height="100%" alignItems="start">
          {messages.map((message, index) => (
            <Text key={index}>{message}</Text>
          ))}
        </VStack>
        <Box as="form" onSubmit={handleSubmit} w="100%">
          <HStack w="100%">
            <FormControl flexGrow={1}>
              <Input
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
            </FormControl>
            <Button type="submit">send</Button>
          </HStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default App
