import React from 'react';

const Auth = () => {
  return (
    <div>
      <h1 className='text-center'>Login Form</h1>
      <form>
        <div className='form-group'>
          <label>Email: </label>
          <input type="email" className='form-control' />
        </div>

        <div className='form-group'>
          <label>Password: </label>
          <input type="password" className='form-control' />
        </div>

        <div className='form-group'>
          <button type="login">Login</button>
        </div>

      </form>
    </div>
  )
}

export default Auth;