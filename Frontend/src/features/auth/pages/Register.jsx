import React from 'react'
import { Link, useNavigate } from 'react-router'

const Register = () => {

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/')
  }

  return (
    <main>
      <div className="form-container">

        <h1>Register</h1>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="username" id='username' name='username' placeholder='Enter your username' />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id='email' name='email' placeholder='Enter your email' />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id='password' name='password' placeholder='Enter password' />
          </div>

          <button type='submit' className='button primary-button' >Register</button>
        </form>

        <p>Have an account ? <Link to={"/login"} >Login</Link> </p>
      </div>
    </main>
  )
}

export default Register