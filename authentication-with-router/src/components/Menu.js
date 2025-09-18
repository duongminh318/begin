import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Menu extends Component {
    render() {
        return (
            < nav className='text-right'>
                <NavLink to="/"
                    className="btn btn-info mr-3" >Home</NavLink>
                <NavLink to="products"
                    className="btn btn-info mr-3">Product</NavLink>
                <NavLink to="/login"
                    className="btn btn-info mr-3">Login</NavLink>
                <NavLink to="register"
                    className="btn btn-info mr-3">Registers</NavLink>
                </nav >
                );
    }
}

                export default Menu;