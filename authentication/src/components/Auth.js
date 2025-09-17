import React, { useState } from 'react';

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState("false");
  const [error, setError] = useState("");
  return (
    <div>
      <h1 className='text-center'>Login Form</h1>
      <form>
        <div className='form-group'>
          <label>Email: </label>
          <input type="email" className='form-control'
            onChange={(event) => { setEmail(event.target.value) }}
            value={email}
          />
        </div>

        <div className='form-group'>
          <label>Password: </label>
          <input type="password" className='form-control'
            onChange={(event) => { setPassword(event.target.value) }}
            value={password}
          />
        </div>

        <div className='form-group'>
          <button type="login"
            className='btn btn-primary'
          >Login</button>
        </div>

      </form>
    </div>
  )
}

export default Auth;