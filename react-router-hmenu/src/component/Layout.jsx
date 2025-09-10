import React, { Component } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
class Layout extends Component {
    render() {
        return (
            <div>
                <h1>Reta</h1>
                {/* menu */}
                <nav>
                    <ul>
                        <li className='header'>
                            <NavLink to={"/"}>Trang chủ</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/introduction"}>Giới thiệu</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/product"}>Sản phậm</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/service"}>Dịch vụ</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/recruitment"}>Tuyển dụng</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/contact"}>liên hệ</NavLink>
                        </li>
                    </ul>
                </nav>
                {/* Đây là chỗ render các route con */}
                <Outlet />
            </div>
        );
    }
}

export default Layout;