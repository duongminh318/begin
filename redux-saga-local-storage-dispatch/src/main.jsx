import { StrictMode } from 'react'                // StrictMode giúp phát hiện bug tiềm ẩn khi dev
import { createRoot } from 'react-dom/client'    // React 18 dùng createRoot để render app
import './index.css'                             // Import CSS toàn cục
import App from './App.jsx'                      // Import component App gốc

import { applyMiddleware, createStore } from 'redux';   // Tạo Redux store + gắn middleware
import rootReducer from './reducers/index.js';          // Import rootReducer (kết hợp các reducer con)
import { Provider } from 'react-redux'                  // Provider giúp React kết nối với Redux store

import { mySaga } from './sagas/mySagas.js';            // Import saga gốc (chứa các effect, watcher...)
import createSagaMiddleWare from "redux-saga"           // Import hàm tạo saga middleware

// Tạo middleware cho saga
const sagaMiddleware = createSagaMiddleWare();

// Tạo Redux store, gắn sagaMiddleware vào
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

// Render ứng dụng React vào #root
createRoot(document.getElementById('root')).render(
  <StrictMode>                {/* Bật chế độ StrictMode để React kiểm tra code */}
    <Provider store={store}>  {/* Truyền Redux store vào toàn app qua Context */}
      <App />                 {/* Component gốc */}
    </Provider>
  </StrictMode>,
)

// Kích hoạt saga (phải gọi thì saga mới chạy)
sagaMiddleware.run(mySaga)
