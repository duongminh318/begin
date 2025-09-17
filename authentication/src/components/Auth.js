import React, { useState } from 'react';
import ProductList from './ProductList';

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(localStorage.getItem("access_token") != null);
  const [error, setError] = useState("");

  const login = () => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "email": email,
      "password": password
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://localhost:8000/auth/login", requestOptions)
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        }
        setIsLogin(false);
        throw new Error(response.statusText)

      })

      .then((result) => {
        localStorage.setItem("access_token", result.access_token);

        localStorage.setItem("email", email);
        setIsLogin(true);

      })
      .catch((error) => setError(error.toString()));

  }

  if (isLogin) {
    return <ProductList />
  }


  return (
    <div>
      <h1 className='text-center'>Login Form</h1>
      {error ? <div className="alert alert-danger">{error}</div> : ""}
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
          <button type="button"
            className='btn btn-primary'
            onClick={() => login()}

          >Login</button>
        </div>

      </form>
    </div>
  )
}

export default Auth;