// State ban đầu: ví có 0 đồng
const initialState = { money: 0 };

// Reducer: nhận state hiện tại + action, trả về state mới
export default function bankReducer(state = initialState, action) {
    switch (action.type) {
        case "deposit":
            // Nạp tiền (cộng payload vào state.money)
            return { money: state.money + action.payload };

        case "withdraw":
            // Rút tiền (trừ payload khỏi state.money)
            return { money: state.money - action.payload };

        default:
            // Nếu action không khớp case nào → giữ nguyên state
            return state;
    }
}
