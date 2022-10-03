import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react"
import { useState } from "react"
import Link from "../components/Link"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault()
    console.log(username, password)
  }

  return (
    <Flex w="100%" h="100vh" alignItems="center" justifyContent="center">
      <VStack as="form" onSubmit={handleSubmit} align="stretch">
        <FormControl>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            placeholder="Enter your username"
            bg="white"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            placeholder="Password"
            bg="white"
          />
        </FormControl>
        <Text>
          Don't have an account yet,{" "}
          <Link to="/register" color="teal">
            register
          </Link>
          ?{" "}
        </Text>
        <Button colorScheme="pink" type="submit">
          Log in
        </Button>
      </VStack>
    </Flex>
  )
}

export default Login