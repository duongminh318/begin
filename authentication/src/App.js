import logo from './logo.svg';
import './App.css';
import React, { Fragment } from 'react';
import ProductList from './components/ProductList';
import Auth from './components/Auth';

function App() {
  return (
    <div className="container-fluid mt-3">
     <Auth/>
      <ProductList />
    </div>
  );
}

export default App;
