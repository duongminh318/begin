import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout.jsx';
import Home from './Home.jsx';
import Contact from './Contact.jsx';
import Product from './Product.jsx';
import Recruitment from './Recruitment.jsx';
import Introduction from './Introduction.jsx';
import Service from './Service.jsx';

class Main extends Component {
    render() {
        return (
            <BrowserRouter>
                {/* Gom nhóm routes */}
                <Routes>
                    {/* Route cha */}
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="recruitment" element={<Recruitment />} />
                        <Route path="product" element={<Product />} />
                        <Route path="introduction" element={<Introduction />} />
                        <Route path="service" element={<Service />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        );
    }
}

export default Main;
