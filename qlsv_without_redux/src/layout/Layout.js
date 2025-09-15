import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

class Layout extends Component {
    render() {
        return (
            <div className="container" style={{ marginTop: 20 }}>
                <Header />
                <Outlet /> {/* Dữ liệu động */}
                <Footer />
            </div>
        );
    }
}

export default Layout;