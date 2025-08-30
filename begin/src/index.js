import React from 'react';
import ReactDOM from 'react-dom/client';
import Car1 from './Car1';
import Car2 from './Car2';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const element= <Car2/>
const element = <Car1 />
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <h2 className='class1'> Tèo em</h2>
  // <Car1/>
  element
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
