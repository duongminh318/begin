import React, { Component } from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';


const Menu = () => {
    const navigator = useNavigate();
    const logout = () => {
        // Xóa token trong localStorage (dùng để xác thực người dùng)
        localStorage.removeItem("access_token");

        // Xóa email trong localStorage (thường lưu để hiển thị thông tin user)
        localStorage.removeItem("email");
        navigator("/")

    }
    return (
        < nav className='text-right'>
            <NavLink to="/"
                className="btn btn-info mr-3" >Home</NavLink>
            {localStorage.getItem("access_token") ?
                <>  <NavLink to="products"
                    className="btn btn-info mr-3">Product</NavLink>
                    <button
                        className="btn btn-info mr-3"
                        onClick={() => logout()}
                    >Logout</button>
                    <button className="btn btn-warning mr-3">
                        {localStorage.getItem("email")}
                    </button>
                </>
                : <>
                    <NavLink to="/login"
                        className="btn btn-info mr-3">Login</NavLink>
                    <NavLink to="register"
                        className="btn btn-info mr-3">Registers</NavLink>
                </>
            }

        </nav >
    );
}


export default Menu;