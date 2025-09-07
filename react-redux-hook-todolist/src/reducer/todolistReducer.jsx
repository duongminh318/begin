// action là object vd: {type: 'increment'}
// Khởi tạo state ban đầu từ localStorage (nếu có)
const initialState = JSON.parse(localStorage.getItem("reactTodolist")) || [];

const todoListReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        // --- TRƯỜNG HỢP THÊM MỚI ---
        case 'add':
            newState = [];
            for (const el of state) {
                newState.push({ ...el });
            }
            newState.push({ ...action.payload });

            // 👉 Lưu vào localStorage
            localStorage.setItem("reactTodolist", JSON.stringify(newState));

            return newState;

        // --- TRƯỜNG HỢP XÓA ---
        case 'remove':
            newState = [];
            const removeKey = Number(action.payload);
            for (const el of state) {
                if (el.key !== removeKey) {
                    newState.push({ ...el });
                }
            }

            // 👉 Lưu vào localStorage
            localStorage.setItem("reactTodolist", JSON.stringify(newState));

            return newState;

        default:
            return state;
    }
}

export default todoListReducer;
