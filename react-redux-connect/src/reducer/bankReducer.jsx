// State ban đầu: ví tiền có 0 đồng
const initialState = { money: 0 };

export default function bankReducer(state = initialState, action) {
    // Hàm reducer: nhận state hiện tại + action, rồi trả về state mới

    let newState; // biến tạm để lưu state mới

    switch (action.type) { // kiểm tra loại action gửi vào
        case 'deposit':
            // Nếu action.type === 'deposit' (gửi tiền)
            newState = { money: state.money + action.payload }
            // Cộng thêm số tiền từ action.payload
            return newState;

        case 'withdraw':
            // Nếu action.type === 'withdraw' (rút tiền)
            newState = { money: state.money - action.payload }
            // Trừ đi số tiền từ action.payload
            return newState;

        default:
            // Nếu action không khớp case nào, giữ nguyên state hiện tại
            return {...state, teoem:5};
    }
}
