import { INCREMENT, DECREMENT } from "../actions/actionTypes";
// Import hằng số định nghĩa action types (INCREMENT, DECREMENT)

import { takeEvery, call } from "redux-saga/effects";
// Import effect takeEvery (lắng nghe action) và call (gọi hàm trong saga)

// Worker saga: chạy khi có action INCREMENT
export function* incrementlog() {
    // Gọi console.log thông qua effect call (để saga quản lý side effect này)
    yield call(console.log, "Log tăng từ sagaMiddleware");

    // Gọi hàm logLocalStorage để lưu log "tăng" vào localStorage
    yield call(logLocalStorage, "tăng");
}

// Worker saga: chạy khi có action DECREMENT
export function* decrementlog() {
    // Log ra console khi action DECREMENT được dispatch
    yield call(console.log, "Log giảm từ sagaMiddleware");

    // Lưu log "giảm" vào localStorage
    yield call(logLocalStorage, "giảm");
}

// Hàm tiện ích: dùng để lưu thông tin log vào localStorage
function logLocalStorage(type) {
    // Lấy dữ liệu log hiện có từ localStorage (nếu chưa có thì dùng mảng rỗng [])
    const logActionSaga = JSON.parse(localStorage.getItem("log_action_saga")) || [];

    // Thêm log mới (chuỗi "tăng" hoặc "giảm") vào mảng
    logActionSaga.push(type);

    // Lưu lại mảng log vào localStorage dưới dạng JSON string
    localStorage.setItem("log_action_saga", JSON.stringify(logActionSaga));
}

// Watcher saga: lắng nghe action và gọi worker tương ứng
export function* mySaga() {
    // Mỗi khi có action INCREMENT, gọi worker incrementlog
    yield takeEvery(INCREMENT, incrementlog);

    // Mỗi khi có action DECREMENT, gọi worker decrementlog
    yield takeEvery(DECREMENT, decrementlog);
}
