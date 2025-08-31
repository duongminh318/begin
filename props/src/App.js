import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react';

// cách 1: arrow function
// const Car= (props) =>{
//   console.log(props);
//   return(
//     <div>
//       This is car with color {props.color} --
//       and version {props.version}
//     </div>
//   )
// }

// cách 2. class component
class Car extends Component {
  constructor(props){
    super(props)  // để sử dụng dc obj props của cha
  }
  render() {
    return (
      <div>
         This is car with color {this.props.color} --
        and version {this.props.version}
      </div>
    );
  }
}






function App() {
  return (
    <div>
      <Car color="red" version="2.0"/>
      <Car color="yellow" version="3.0" />
    </div>
   
  );
}

export default App;
