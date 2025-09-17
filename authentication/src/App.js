import logo from './logo.svg';
import './App.css';
import React, { Fragment } from 'react';
import ProductList from './components/ProductList';

function App() {
  return (
    <div className="container-fluid mt-3">
      <ProductList />
    </div>
  );
}

export default App;
