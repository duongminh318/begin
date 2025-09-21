
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { incrementAction, decrementAction } from './actions/index';
// import counterReducers from "./counterReducers";

function App() {
  const dispatch = useDispatch();
  const state = useSelector(state => state.counterReducers);


  function increment(step) {
    // alert(1);
    // dispatch to store later

    dispatch(incrementAction(step))
  }

  function decrement(step) {
    // alert(2);
    // dispatch to store later
    dispatch(decrementAction(step))
  }
  return (


    <div className='App'>
      <button onClick={() => increment(2)}>
        Tăng
      </button>

      <button onClick={() => decrement(3)}>
        Giảm
      </button>

      <div> Times: {state.times}</div>
      <div> LogStatus: {state.statusLog}</div>

    </div>


  )
}

export default App
