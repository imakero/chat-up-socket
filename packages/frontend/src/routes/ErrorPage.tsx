import { Heading, VStack, Text } from "@chakra-ui/react"
import { useRouteError } from "react-router-dom"

const ErrorPage = () => {
  const error = useRouteError() as { statusText: string }
  console.error(error)

  return (
    <VStack h="100vh" spacing={4} alignItems="center" justifyContent="center">
      <Heading>Ops</Heading>
      <Text>Something went wrong:</Text>
      <Text>{error?.statusText}</Text>
    </VStack>
  )
}

export default ErrorPage
