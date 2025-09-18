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

  // hàm xử lý khi nhấn nút logout
  const logout = () => {
    // Xóa token trong localStorage (dùng để xác thực người dùng)
    localStorage.removeItem("access_token");

    // Xóa email trong localStorage (thường lưu để hiển thị thông tin user)
    localStorage.removeItem("email");

    // Cập nhật state => đánh dấu user đã đăng xuất
    setIsLogin(false);
  }

  if (isLogin) {
    return (
      <div>
        <div className='text-right'>
          <label className='text-primary'>
            {localStorage.getItem("email")}
          </label>
          <button className='btn btn-success btn-sm ml-2'
            onClick={() => logout()}
          >
            Logout
          </button>
        </div>
        <ProductList />
      </div>
    )
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