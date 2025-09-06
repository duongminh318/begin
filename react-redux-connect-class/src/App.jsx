
import './App.css'
import { connect } from 'react-redux'   // connect giúp kết nối React component với Redux store
import React from 'react';
// Component App
class App extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
     console.log("component re-render"); // Mỗi khi state trong store thay đổi -> component render lại

  return (
    <div>
      {/* Nút gửi tiền: khi click sẽ gọi props.dispatchDeposit(20) */}
      <button onClick={() => this.props.dispatchDeposit(20)}>deposit $20</button>

      {/* Nút rút tiền: khi click sẽ gọi props.dispatchWithdraw(10) */}
      <button onClick={() => this.props.dispatchWithdraw(10)}>withdraw $10</button>

      {/* Hiển thị số tiền hiện tại trong Redux store */}
      <div id="result">{this.props.money}</div>    {/* props là một object */}
    </div>
  )
  }

 
}

// mapStateToProps: lấy dữ liệu từ Redux store và đưa vào props của component
// -> Khi state.money thay đổi thì component sẽ được re-render
const mapStateToProps = (state, ownProps) => {
  console.log("hàm chạy mapStateToProps");
  return {
    money: state.money   // lấy state.money từ store -> gắn vào props.money
  }
}

// mapDispatchToProps: tạo ra các hàm để dispatch action lên store
// -> Giúp component có thể gọi trực tiếp props.dispatchDeposit(...) hoặc props.dispatchWithdraw(...)
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatchDeposit: (number) => {
      dispatch({ type: "deposit", payload: number })  // gửi action "deposit" kèm số tiền
    },
    dispatchWithdraw: (number) => {
      dispatch({ type: "withdraw", payload: number }) // gửi action "withdraw" kèm số tiền
    },
  }
}

// Kết nối component App với Redux store
// -> mapStateToProps đưa state vào props
// -> mapDispatchToProps đưa các hàm dispatch vào props
export default connect(mapStateToProps, mapDispatchToProps)(App)
