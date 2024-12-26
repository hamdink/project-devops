import { createContext, useContext, useState, useEffect } from 'react'
import { fetchUserData } from 'src/pages/api/appConfig'

export const UserContext = createContext()

export function useUser() {
  return useContext(UserContext)
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setLoading] = useState(true)

  const fetchUser = async () => {
    const userData = await fetchUserData()
    setUser(userData)
    setLoading(false)
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <UserContext.Provider value={{ user, isLoading, fetchUser }}>
      {children}
    </UserContext.Provider>
  )
}
