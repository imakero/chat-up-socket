import React from "react"
import ReactDOM from "react-dom/client"
import App from "./routes/App"
import { ChakraProvider } from "@chakra-ui/react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { SocketProvider } from "./context/SocketContext"
import ErrorPage from "./routes/ErrorPage"
import Login from "./routes/Login"
import Register from "./routes/Register"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
])

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <SocketProvider>
        <RouterProvider router={router} />
      </SocketProvider>
    </ChakraProvider>
  </React.StrictMode>
)
