import { useContext } from "react"
import { AuthContext } from "../auth.context"
import { login, register, logout } from '../services/auth.api'

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  
  const { user, setUser, loading, setLoading } = context

  const handleLogin = async ({email, password}) => {
    setLoading(true)
    try {
      const data = await login({email, password})
      if (data && data.user) {
        setUser(data.user)
      }
    } catch (error) {
      console.error("Error in handleLogin, ", error)
    } finally{
      setLoading(false)
    }
  }

  const handleRegister = async ({email, username, password}) => {
    setLoading(true)
    try {
      const data = await register({email, username, password})
      if (data && data.user) {
        setUser(data.user)
      }
    } catch (error) {
      console.error("Error in handleRegister, ", error)
    } finally{
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    setLoading(true)
    try {
      await logout()
      setUser(null)
    } catch (error) {
      console.error("Error in handleLogout, ", error)
    } finally{
      setLoading(false)
    }
  }

  return {user, loading, handleRegister, handleLogin, handleLogout}

}