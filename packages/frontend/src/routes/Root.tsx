import { Outlet } from "react-router-dom"
import { UserProvider } from "../context/UserContext"

const Root = () => {
  return (
    <UserProvider>
      <Outlet />
    </UserProvider>
  )
}

export default Root
