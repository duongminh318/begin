import { useDispatch, useSelector } from "react-redux";
import './App.css';

function App() {
  const todoList = useSelector(state => state);   // Lấy danh sách từ store
  const dispatch = useDispatch();

  // Thêm task mới
  function handleSubmit(event) {
    event.preventDefault();
    const newTodo = event.target.querySelector("input").value.trim();

    if (newTodo) {
      const keyName = Date.now(); // unique hơn random
      const objNewTodo = { key: keyName, name: newTodo };
      dispatch({ type: "add", payload: objNewTodo });
    }

    event.target.reset(); // clear input
  }

  // Xóa task theo key
  function handleRemove(key) {
    dispatch({ type: "remove", payload: key });
  }

  return (
    <div>
      <h1>Danh sách công việc cần làm</h1>

      <form onSubmit={handleSubmit}>
        Nhập công việc : <input type="text" />
      </form>

      <ol id="view-todolist">
        {todoList.map((el) => (
          <li key={el.key}>
            {el.name}
            <button onClick={() => handleRemove(el.key)}>Delete</button>
          </li>
        ))}
      </ol>

      <div>
        Số lượng: <span className="qty">{todoList.length}</span>
      </div>
    </div>
  );
}

export default App;
