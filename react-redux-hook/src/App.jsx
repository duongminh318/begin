import { useDispatch, useSelector } from "react-redux";

function App() {
  // Lấy state từ store (state.money)
  const money = useSelector((state) => state.money);
  console.log("change");

  // Lấy hàm dispatch từ store
  const dispatch = useDispatch();

  // Hàm nạp tiền
  function dispatchDeposit(number) {
    dispatch({ type: "deposit", payload: number });
  }

  // Hàm rút tiền
  function dispatchWithdraw(number) {
    dispatch({ type: "withdraw", payload: number });
  }

  return (
    <div>
      <h1>🏦 Ngân hàng mini</h1>

      <button onClick={() => dispatchDeposit(20)}>Deposit $20</button>
      <button onClick={() => dispatchWithdraw(10)}>Withdraw $10</button>

      <h2>Số dư hiện tại: ${money}</h2>
    </div>
  );
}

export default App;
