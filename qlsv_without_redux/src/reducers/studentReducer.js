// Khởi tạo state mặc định (ban đầu) cho reducer này.
// Ở đây chỉ có một thuộc tính là "search", giá trị rỗng "".
const initialState = { search: "" };

// Định nghĩa reducer có tên là bankReducer.
// Reducer là một function nhận vào 2 tham số:
// - state: trạng thái hiện tại (nếu chưa có thì gán mặc định = initialState).
// - action: object mô tả hành động cần xử lý (có type và payload).
export default function bankReducer(state = initialState, action) {
    let newState; // Biến tạm để lưu state mới sau khi xử lý action.

    switch (action.type) { // Kiểm tra action gửi vào.

        // Nếu action có type là 'search':
        case 'search':
            // Tạo state mới với search = dữ liệu được gửi kèm (action.payload).
            newState = { search: action.payload }
            return newState; // Trả về state mới.

        // Nếu không khớp với case nào ở trên:
        default:
            return state; // Giữ nguyên state cũ, không thay đổi.
    }
}
