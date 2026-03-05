import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Register = () => {

  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { loading, handleRegister } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await handleRegister({email, username, password})
      setEmail("")
      setUsername("")
      setPassword("")
      navigate("/")
    } catch (err) {
      console.error("Register failed", err)
    }
  }

  if(loading){
    return (<main><h1>Loading....</h1></main>)
  }

  return (
    <main>
      <div className="form-container">

        <h1>Register</h1>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="username" 
              id='username' 
              name='username' 
              placeholder='Enter your username' 
              value={username}
              onChange={(e)=>{setUsername(e.target.value)}}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id='email' 
              name='email' 
              placeholder='Enter your email' 
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id='password' 
              name='password' 
              placeholder='Enter password' 
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <button type='submit' className='button primary-button' >Register</button>
        </form>

        <p>Have an account ? <Link to={"/login"} >Login</Link> </p>
      </div>
    </main>
  )
}

export default Register