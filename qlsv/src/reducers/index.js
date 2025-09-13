// Import hàm combineReducers từ Redux Toolkit.
// combineReducers dùng để gộp nhiều reducer nhỏ lại thành một reducer "gốc" duy nhất (rootReducer).
import { combineReducers } from '@reduxjs/toolkit'

// Import reducer quản lý state sinh viên.
import studentReducer from './studentReducer'



// Gộp tất cả reducer thành một object thông qua combineReducers.
// Ở đây mới gộp 1 reducer (studentReducer), nhưng sau này có thể thêm counter hoặc các reducer khác vào.
const rootReducer = combineReducers({
  // key: value
  // key là tên state trong store, value là reducer quản lý state đó.
  studentReducer: studentReducer
  // ví dụ nếu thêm counter: counter: counter
})

// Xuất rootReducer để dùng trong createStore/configureStore.
// Đây chính là reducer "tổng" cho toàn bộ ứng dụng.
export default rootReducer
