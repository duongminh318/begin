import { INCREMENT } from "../actions/actionTypes";       // Import hằng số INCREMENT (action type)
import { takeEvery } from "redux-saga/effects"            // Import effect takeEvery để lắng nghe action

// Saga worker: chạy khi action INCREMENT được dispatch
export function* incrementlog() {
    // yield console.log("tăng");   // ❌ console.log không phải effect, nên không cần yield
    yield console.log("Log tăng tù sagaMiddleWare");           // ✅ log ra "tăng" mỗi khi có action INCREMENT
}

// Saga watcher: lắng nghe action INCREMENT
export function* mySaga() {
    // takeEvery: mỗi lần có action INCREMENT thì gọi incrementlog
    yield takeEvery(INCREMENT, incrementlog);
}
