import { User } from "@chat-up-socket/shared"
import { createContext, useState, useEffect } from "react"
import { getAuthToken } from "../lib/auth"

interface UserContextInterface {
  user: User | null
  setUser?: React.Dispatch<React.SetStateAction<User | null>>
  loading: boolean
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

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("http://localhost:4000/api/1.0/users/me", {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      })
      const user = await res.json()
      setUser(user)
      setLoading(false)
    }

    const token = getAuthToken()
    if (!token) {
      setLoading(false)
    } else {
      fetchUser()
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  )
}
