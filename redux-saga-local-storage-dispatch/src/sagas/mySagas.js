// Import action creator logAction để dispatch log ra store
import { logAction } from "../actions";

// Import hằng số định nghĩa action types (INCREMENT, DECREMENT)
import { INCREMENT, DECREMENT } from "../actions/actionTypes";

// Import effect của redux-saga:
// - takeEvery: lắng nghe action
// - call: gọi hàm side-effect
// - put: dispatch action ra store
import { takeEvery, call, put } from "redux-saga/effects";


// Hàm giả lập delay: trả về 1 Promise resolve sau ms mili giây
// => Để saga có thể "yield" và chờ
const delay = (ms) => new Promise(res => setTimeout(res, ms));


// Worker saga: chạy khi có action INCREMENT
// action được redux-saga truyền vào (có thể chứa payload như step)
export function* incrementlog(action) {
    // Dispatch action "Đang log..." để thông báo là đang xử lý
    yield put(logAction("Đang log..."));

    // Tạm dừng 5 giây trước khi chạy tiếp
    yield delay(5000);

    // Gọi console.log thông qua effect call (để saga quản lý side-effect này)
    yield call(console.log, "Log tăng từ sagaMiddleware");

    // Lưu log "tăng : step" vào localStorage
    yield call(logLocalStorage, ` tăng : ${action.step}`);

    // Dispatch action "Đã log..." để báo đã hoàn tất
    yield put(logAction("Đã log..."));
}


// Worker saga: chạy khi có action DECREMENT
export function* decrementlog(action) {
    // Dispatch action "Đang log..."
    yield put(logAction("Đang log..."));

    // Tạm dừng 2 giây
    yield delay(2000);

    // Log ra console
    yield call(console.log, "Log giảm từ sagaMiddleware");

    // Lưu log "giảm : step" vào localStorage
    yield call(logLocalStorage, ` giảm : ${action.step}`);

    // Dispatch action "Đã log..."
    yield put(logAction("Đã log..."));
}


// Hàm tiện ích: dùng để lưu thông tin log vào localStorage
function logLocalStorage(type) {
    // Lấy dữ liệu log hiện có từ localStorage
    // Nếu chưa có thì gán mảng rỗng []
    const logActionSaga = JSON.parse(localStorage.getItem("log_action_saga")) || [];

    // Thêm log mới (chuỗi "tăng" hoặc "giảm")
    logActionSaga.push(type);

    // Ghi lại mảng log vào localStorage dưới dạng JSON string
    localStorage.setItem("log_action_saga", JSON.stringify(logActionSaga));
}


// Watcher saga: lắng nghe action và gọi worker tương ứng
export function* mySaga() {
    // Mỗi khi có action INCREMENT, gọi worker incrementlog
    yield takeEvery(INCREMENT, incrementlog);

    // Mỗi khi có action DECREMENT, gọi worker decrementlog
    yield takeEvery(DECREMENT, decrementlog);
}
