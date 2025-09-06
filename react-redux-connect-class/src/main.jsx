// Import StrictMode: giúp phát hiện bug tiềm ẩn khi dev (chỉ hoạt động ở chế độ development)
import { StrictMode } from "react";

// Import createRoot: React 18 dùng hàm này để render App (thay cho ReactDOM.render cũ)
import { createRoot } from "react-dom/client";

// Import CSS chung cho toàn app
import "./index.css";

// Import component gốc App
import App from "./App.jsx";

// Import logo mặc định (Vite tạo sẵn trong /assets/react.svg)
// -> có thể truyền logo này xuống App.jsx để hiển thị
import reactLogo from "./assets/react.svg";

// Import Redux: createStore để tạo store, Provider để cung cấp store cho toàn bộ App
import { createStore } from "redux";
import { Provider } from "react-redux";

// Import reducer quản lý state (ở đây là ví tiền)
import bankReducer from "./reducer/bankReducer.jsx";


// Tạo Redux store từ reducer
// Store = nơi trung tâm lưu trữ state của toàn ứng dụng
const store1 = createStore(bankReducer);


// Render App vào thẻ <div id="root"></div> trong index.html
createRoot(document.getElementById("root")).render(
  // StrictMode: chỉ hoạt động khi dev, giúp cảnh báo bug
  <StrictMode>
    {/* Provider: bọc App và truyền store xuống toàn bộ component con */}
    <Provider store={store1}>
      {/* App là component gốc, có thể nhận thêm prop logo nếu cần */}
      <App logo={reactLogo} />
    </Provider>
  </StrictMode>
);
