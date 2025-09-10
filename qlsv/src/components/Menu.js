import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Menu extends Component {
    render() {
        return (
            <>
                <NavLink to="student" className="btn btn-info mr-3">Students</NavLink>
                <NavLink to="subject" className="btn btn-info mr-3">Subjects</NavLink>
                <NavLink to="register" className="btn btn-info mr-3">Registers</NavLink>
            </>
        );
    }
}

export default Menu;