import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const register = () => {

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

                throw new Error(response.statusText)

            })

            .then((result) => {
                localStorage.setItem("access_token", result.access_token);

                localStorage.setItem("email", email);
                // redirect to products page

                navigate("/products")


            })
            .catch((error) => setError(error.toString()));

    }





    return (
        <div>

            <form style={{ maxWidth: "600px", margin: "auto" }}>
                <h1 className='text-center'>Register Form</h1>
                {error ? <div className="alert alert-danger">{error}</div> : ""}
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
                        onClick={() => register()}

                    >Register</button>
                </div>

            </form>
        </div>
    )
}

export default RegisterPage;