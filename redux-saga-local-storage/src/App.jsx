
import './App.css'

function App() {

  function increment() {
    alert(1);
    // dispatch to store later
  }

  function decrement() {
    alert(2);
    // dispatch to store later
  }
  return (


    <div className='App'>
      <button onClick={() => increment()}>
        Tăng
      </button>

      <button onClick={() => decrement()}>
        Giảm
      </button>

      <div> Message...</div>

    </div>


  )
}

export default App
