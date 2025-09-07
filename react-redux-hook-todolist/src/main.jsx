import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createStore } from "redux";
import App from "./App.jsx";
// import bankReducer from "./reducer/bankReducer.jsx";
import todoListReducer from "./reducer/todolistReducer.jsx";

const store = createStore(todoListReducer);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
