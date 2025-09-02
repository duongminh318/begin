// Lấy công cụ `createStore` từ thư viện Redux.
const { createStore } = window.Redux;

// --- BƯỚC 1: KHO HÀNG BAN ĐẦU ---
// Khởi tạo state là một mảng rỗng, sẵn sàng chứa các công việc.
const initialState = [];

// --- BƯỚC 2: THUÊ "THỦ KHO" (REDUCER) ---
const todoListReducer = (state = initialState, action) => {
    // Thủ kho xem loại yêu cầu trên phiếu là gì.
    switch (action.type) {
        // Nếu yêu cầu là "add"...
        case "add":
            // ...Thủ kho sẽ tạo ra một danh sách MỚI bằng cách:
            // 1. Sao chép toàn bộ danh sách cũ (...state).
            // 2. Thêm công việc mới (action.payload) vào cuối danh sách mới đó.
            // 3. Trả về danh sách MỚI này.
            return [...state, action.payload]; // Đây là cách viết tắt cho 3 dòng code cũ của anh

        // Tạm thời chưa dùng đến case "remove"
        case "remove":
            // ... Code xử lý xóa ...
            // Phải return về state mới
            return newState;

        // Nếu không phải yêu cầu "add", trả về kho như cũ.
        default:
            return state;
    }
}

// --- BƯỚC 3: XÂY DỰNG "KHO" VÀ "GIAO DỊCH" ---
let store = createStore(todoListReducer);

// In ra trạng thái ban đầu để kiểm tra. Kết quả: [] (mảng rỗng)
console.log(store.getState());

// --- BƯỚC 4: LẮP "CAMERA AN NINH" (SUBSCRIBE) ---
// `store.subscribe` sẽ đăng ký một hàm. Hàm này sẽ tự động được gọi
// MỖI KHI dữ liệu trong kho (store) có sự thay đổi.
store.subscribe(() => {
    // Lấy danh sách công việc mới nhất từ kho.
    const todoList = store.getState();
    const olTag = document.getElementById("view-todolist");

    // "Tổng vệ sinh" danh sách cũ trên giao diện trước khi hiển thị danh sách mới.
    // Bước này cực kỳ quan trọng để tránh dữ liệu bị lặp lại.
    olTag.innerHTML = '';

    // Lặp qua từng công việc trong danh sách mới và tạo thẻ <li> tương ứng.
    for (const todo of todoList) {
        var liTag = document.createElement("li");
        liTag.textContent = todo;
        olTag.appendChild(liTag);
    }
    console.log(store.getState());
});

// --- BƯỚC 5: XỬ LÝ SỰ KIỆN NGƯỜI DÙNG ---
// Lấy ra thẻ <form>
const formTag = document.querySelector("form");
// Gán sự kiện khi người dùng submit form (nhấn Enter hoặc bấm nút)
formTag.onsubmit = function (e) {
    // Ngăn trình duyệt tải lại trang (hành vi mặc định của form).
    e.preventDefault();

    const inputTag = formTag.querySelector("input");
    const taskName = inputTag.value;

    // Gửi "phiếu yêu cầu" loại "add" đến cho "thủ kho",
    // kèm theo "hàng hóa" là tên công việc.
    store.dispatch({ type: "add", payload: taskName });

    // Xóa nội dung trong ô input để người dùng tiện nhập công việc mới.
    inputTag.value = '';
}