import { ChakraProps, Link as ChakraLink } from "@chakra-ui/react"
import { Link as ReactRouterLink } from "react-router-dom"

interface LinkProps extends ChakraProps {
  to: string
  children?: React.ReactNode
}

const Link = ({ to, children, ...props }: LinkProps) => {
  return (
    <ChakraLink to={to} as={ReactRouterLink} {...props}>
      {children}
    </ChakraLink>
  )
}

export default Link
