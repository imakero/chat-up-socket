import {
  Button,
  ChakraProvider,
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
import { useEffect, useState } from "react"
import { Socket } from "socket.io-client"
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from "@chat-up-socket/shared"

type AppProps = {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>
}

function App({ socket }: AppProps) {
  const [name, setName] = useState<string>("Anonymous")
  const [message, setMessage] = useState<string>("")
  const [messages, setMessages] = useState<string[]>([])

  useEffect(() => {
    console.log("running effect")
    socket.on("chatMessage", ({ message }) => {
      setMessages((messages) => [...messages, message])
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
      socket.offAny(anyListener)
    }
  }, [socket])

  const handleSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault()
    console.log("sending message")
    socket.emit("chatMessage", { message })
    setMessage("")
  }

  return (
    <ChakraProvider>
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
    </ChakraProvider>
  )
}

export default App
