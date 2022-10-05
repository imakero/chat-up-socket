import { User } from "@chat-up-socket/shared"
import { createContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getAuthToken, removeAuthToken } from "../lib/auth"

interface UserContextInterface {
  user: User | null
  setUser?: React.Dispatch<React.SetStateAction<User | null>>
  loading: boolean
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
}

export const UserContext = createContext<UserContextInterface>({
  user: null,
  loading: true,
})

interface UserProviderProps {
  children?: React.ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading) {
      return
    }

    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/1.0/users/me", {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        })
        const user = await res.json()
        setUser(user)
        setLoading(false)
      } catch (error) {
        console.error("there was an error while requesting user", error)
        setUser(null)
        setLoading(false)
        removeAuthToken()
        navigate("/login")
      }
    }

    const token = getAuthToken()
    if (!token) {
      setLoading(false)
    } else {
      fetchUser()
    }
  }, [loading, navigate])

  return (
    <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  )
}
