import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { SocketContext } from "../context/SocketContext"
import { UserContext } from "../context/UserContext"

function App() {
  const { user, loading } = useContext(UserContext)
  const [name, setName] = useState<string>("Anonymous")
  const [message, setMessage] = useState<string>("")
  const [messages, setMessages] = useState<string[]>([])
  const socket = useContext(SocketContext)
  const navigate = useNavigate()

  console.log("user is:", user)
  console.log("loading is:", loading)

  useEffect(() => {
    console.log("running effect")

    if (!loading && !user) {
      navigate("/login")
    }

    socket.on("chatMessage", ({ message }) => {
      setMessages((messages) => [...messages, message])
    })

    socket.on("connect_error", (error) => {
      setMessages((messages) => [...messages, error.message])
    })

    const anyListener = (event: any, ...args: any) => {
      console.log("onAny: \n", event, args)
      console.log(socket.id)
    }

    if (socket.listenersAny().length === 0) {
      socket.onAny(anyListener)
    }

    return () => {
      socket.off("chatMessage")
      socket.off("connect_error")
      socket.offAny(anyListener)
    }
  }, [socket, loading, user, navigate])

  const handleSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault()
    console.log("sending message")
    socket?.emit("chatMessage", { message })
    setMessage("")
  }

  return (
    <Container size="xl" height="100vh" py={4}>
      <VStack height="100%" alignItems="start">
        <Heading>Welcome {name}</Heading>
        <VStack height="100%">
          {messages.map((message, index) => (
            <Text key={index}>{message}</Text>
          ))}
        </VStack>
        <form onSubmit={handleSubmit}>
          <HStack>
            <FormControl>
              <FormLabel>Send a message</FormLabel>
              <Input
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
              <FormHelperText>Don't be rude!</FormHelperText>
            </FormControl>
            <Button type="submit">send</Button>
          </HStack>
        </form>
      </VStack>
    </Container>
  )
}

export default App
