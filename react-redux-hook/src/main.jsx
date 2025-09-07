import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Redux
import { createStore } from "redux";
import { Provider } from "react-redux";
import bankReducer from "./reducer/bankReducer";

// Tạo store từ reducer
const store = createStore(bankReducer);

// Render app, bọc Provider để toàn bộ app dùng được Redux
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
