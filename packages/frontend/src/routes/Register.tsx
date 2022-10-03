import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react"
import { useState } from "react"

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault()
    console.log(email, username, password)
  }

  return (
    <Flex w="100%" h="100vh" alignItems="center" justifyContent="center">
      <VStack as="form" onSubmit={handleSubmit} align="stretch">
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormHelperText fontSize="xs">
            (Pst, it doesn't have to be a real email)
          </FormHelperText>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            placeholder="Enter your email"
            bg="white"
          />
        </FormControl>
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
        <Button colorScheme="pink" type="submit">
          Register
        </Button>
      </VStack>
    </Flex>
  )
}

export default Register
