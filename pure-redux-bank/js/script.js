// Lấy công cụ `createStore` từ thư viện Redux.
// `createStore` là hàm dùng để tạo ra "kho chứa" (store) trung tâm.
const { createStore } = window.Redux;


// --- BƯỚC 1: ĐỊNH NGHĨA "KHO HÀNG" BAN ĐẦU ---
// Đây là trạng thái ban đầu của ứng dụng, giống như số lượng hàng tồn kho lúc mới mở cửa.
const initialState = { money: 0 }


// --- BƯỚC 2: THUÊ "THỦ KHO" (REDUCER) ---
// Reducer là một hàm, đóng vai trò như một người thủ kho.
// Nó nhận vào 2 thứ: trạng thái kho hiện tại (state) và một "phiếu yêu cầu" (action).
// Dựa vào "phiếu yêu cầu", nó sẽ trả về một trạng thái kho MỚI.
const bankReducer = (state = initialState, action) => {
    // Thủ kho xem loại yêu cầu trên phiếu (action.type) là gì.
    switch (action.type) {
        // SỬA LỖI: Đổi tên case thành "DEPOSIT" để khớp với yêu cầu từ nút bấm.
        case "DEPOSIT":
            // ...thì thủ kho sẽ trả về một kho MỚI với giá trị `money`
            // bằng giá trị cũ cộng với số lượng trên phiếu (action.payload).
            return { money: state.money + action.payload };

        // SỬA LỖI: Đổi tên case thành "WITHDRAW" để khớp với yêu cầu từ nút bấm.
        case "WITHDRAW":
            // ...thì thủ kho sẽ trả về một kho MỚI với giá trị `money`
            // bằng giá trị cũ trừ đi số lượng trên phiếu (action.payload).
            return { money: state.money - action.payload };

        // Nếu không phải các yêu cầu trên, thủ kho không làm gì cả, trả về kho như cũ.
        default:
            return state;
    }
}


// --- BƯỚC 3: XÂY DỰNG "KHO" VÀ "GIAO DỊCH" ---
// Dùng `createStore` để tạo ra kho hàng thật sự, và giao cho "thủ kho" (bankReducer) quản lý.
let store = createStore(bankReducer);

// In ra trạng thái ban đầu của kho.
console.log(store.getState());

// Đăng ký một "camera an ninh".
// `store.subscribe` sẽ chạy hàm bên trong nó MỖI KHI kho có sự thay đổi.
store.subscribe(() => {
    const state = store.getState();
    const money = state.money;
    // hiển thị lại kết quả số $$$ (money) sau khi nạp, rút
    var divTag = document.getElementById("result");
    divTag.innerHTML = money;
});


// Lấy ra TẤT CẢ các nút bấm.
const buttonTags = document.querySelectorAll("button");
// Lặp qua từng nút để gán sự kiện click.
for (const buttonTag of buttonTags) {
    buttonTag.onclick = function () {
        // Lấy ra loại hành động từ thuộc tính `data` của nút bấm trong file HTML.
        var type = buttonTag.getAttribute("data");

        // SỬA LỖI: Kiểm tra đúng loại hành động và gửi đi "phiếu yêu cầu" tương ứng.
        // Chú ý: "desposit" là do lỗi chính tả trong file HTML của anh, em sửa lại logic để khớp.
        if (type === "desposit") {
            // Gửi phiếu yêu cầu có type là "DEPOSIT"
            store.dispatch({ type: "DEPOSIT", payload: 10 });
        } else {
            // Gửi phiếu yêu cầu có type là "WITHDRAW"
            store.dispatch({ type: "WITHDRAW", payload: 10 });
        }
    }
}