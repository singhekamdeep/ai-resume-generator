import axios from 'axios'

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true
})

export const register = async ({email, username, password}) => {
  try {
    const response = await api.post("/api/auth/register", {
      email, username, password
    })
    return response.data
  } catch (error) {
    console.error("Error while registering, ", error)
  }
}

export const login = async ({email, password}) => {
  try {
    const response = await api.post("/api/auth/login", {
      email, password
    })

    return response.data
  } catch (error) {
    console.error("Error while logging in, ", error)
  } 
}

export const logout = async () => {
  try {
    const response = await api.get("/api/auth/logout")
    return response.data
  } catch (error) {
    console.error("Error while logging out, ", error)
  }
}

export const getMe = async () => {
  try {
    const response = await api.get("/api/auth/get-me")
    return response.data
  } catch (error) {
    console.error("Error while getting user info, ", error)
  }
}