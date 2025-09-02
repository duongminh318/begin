// Lấy công cụ `createStore` từ thư viện Redux.
// `createStore` là hàm dùng để tạo ra "kho chứa" (store) trung tâm.
const { createStore } = window.Redux;


// --- BƯỚC 1: ĐỊNH NGHĨA "KHO HÀNG" BAN ĐẦU ---
// Đây là trạng thái ban đầu của ứng dụng, giống như số lượng hàng tồn kho lúc mới mở cửa.
const initialState = { value: 0 }


// --- BƯỚC 2: THUÊ "THỦ KHO" (REDUCER) ---
// Reducer là một hàm, đóng vai trò như một người thủ kho.
// Nó nhận vào 2 thứ: trạng thái kho hiện tại (state) và một "phiếu yêu cầu" (action).
// Dựa vào "phiếu yêu cầu", nó sẽ trả về một trạng thái kho MỚI.
const counterReducer = (state = initialState, action) => {
    // Thủ kho xem loại yêu cầu trên phiếu (action.type) là gì.
    switch (action.type) {
        // Nếu yêu cầu là "increment" (tăng)...
        case "increment":
            // ...thì thủ kho sẽ trả về một kho MỚI với giá trị `value`
            // bằng giá trị cũ cộng với số lượng trên phiếu (action.payload).
            return { value: state.value + action.payload };

        // Nếu yêu cầu là "decrement" (giảm)...
        case "decrement":
            // ...thì thủ kho sẽ trả về một kho MỚI với giá trị `value`
            // bằng giá trị cũ trừ đi số lượng trên phiếu (action.payload).
            return { value: state.value - action.payload };

        // Nếu không phải các yêu cầu trên, thủ kho không làm gì cả, trả về kho như cũ.
        default:
            return state;
    }
}


// --- BƯỚC 3: XÂY DỰNG "KHO" VÀ "GIAO DỊCH" ---
// Dùng `createStore` để tạo ra kho hàng thật sự, và giao cho "thủ kho" (counterReducer) quản lý.
let store = createStore(counterReducer);

// In ra trạng thái ban đầu của kho. Kết quả: { value: 0 }
console.log(store.getState());

// Đăng ký một "camera an ninh".
// `store.subscribe` sẽ chạy hàm bên trong nó MỖI KHI kho có sự thay đổi.
store.subscribe(() => console.log("Kho đã được cập nhật:", store.getState()));

// Gửi một "phiếu yêu cầu" đến cho thủ kho.
// `store.dispatch` là hành động gửi đi một action.
// Action này có loại là "increment" và số lượng cần xử lý (payload) là 5.
store.dispatch({ type: "increment", payload: 5 });
store.dispatch({ type: "increment", payload: 10 });

// Sau khi dòng trên chạy, "camera an ninh" (subscribe) sẽ phát hiện thay đổi và in ra:
// Kho đã được cập nhật: { value: 5 }