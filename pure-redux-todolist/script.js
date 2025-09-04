// Lấy công cụ `createStore` từ thư viện Redux.
const { createStore } = window.Redux;
// action là object vd: {type: 'increment'}
// Khởi tạo state ban đầu là một mảng rỗng.
const initialState = [];

// --- BƯỚC 2: "THỦ KHO" (REDUCER) ---
// Đây là hàm xử lý logic chính, quyết định state sẽ thay đổi như thế nào.
const todoListReducer = (state = initialState, action) => {
    switch (action.type) {
        // --- TRƯỜNG HỢP THÊM MỚI ---
        case 'add':
            // Cách làm này rất cẩn thận: tạo một mảng mới,
            // sau đó sao chép từng object từ mảng cũ sang để đảm bảo không làm thay đổi "bản gốc".
            var newState = [];
            for (const el of state) {
                newState.push({ ...el });  // sao chép (copy) từng object từ mảng cũ và bỏ vào mảng mới.
            }
            // Thêm object công việc mới vào cuối mảng sao chép.
            newState.push({ ...action.payload });
            return newState; // Trả về mảng mới.

        // --- TRƯỜNG HỢP XÓA ---
        case 'remove':
            // Logic tương tự: tạo một danh sách trống hoàn toàn.
            //  ý tưởng là cái nào ko dc check thì push dô array mới này
            var newState = [];
            // Lặp qua danh sách CŨ.
            for (const el of state) {
                const removeKey = Number(action.payload);
                // KIỂM TRA: Nếu key của công việc hiện tại KHÔNG BẰNG key cần xóa...
                if (el.key != removeKey) {
                    // ...thì giữ lại công việc đó bằng cách thêm nó vào danh sách mới.
                    newState.push({ ...el });
                }
            }
            // Trả về danh sách mới chỉ chứa những công việc đã được "giữ lại".
            return newState;

        default:
            return state;
    }
}

// --- BƯỚC 3: XÂY DỰNG "KHO" ---
let store = createStore(todoListReducer);

// --- BƯỚC 4: LẮP "CAMERA" CẬP NHẬT GIAO DIỆN ---
// `store.subscribe` đăng ký một hàm. Hàm này sẽ tự động chạy MỖI KHI dữ liệu trong kho có thay đổi.
store.subscribe(() => {
    const todoList = store.getState();
    const olTag = document.querySelector("#view-todolist");
    olTag.innerHTML = ''; // "Tổng vệ sinh" giao diện cũ.

    // Tự tạo một biến `key` BẮT ĐẦU TỪ 1 để gán cho các nút bấm và checkbox.
    // LƯU Ý: Đây là một hệ thống key riêng, không liên quan đến `todo.key` ngẫu nhiên.
    let key = 1;
    for (const todo of todoList) {
        const liTag = document.createElement('li');
        liTag.textContent = todo.name;
        // Gán key ngẫu nhiên từ state vào thẻ <li>. Đây là "mã số định danh" thật sự của công việc.
        // nó sẽ có dạng như [{key, taskname}]
        liTag.setAttribute('key', todo.key);

        const btnEl = document.createElement('button');
        btnEl.textContent = 'Xóa';
        btnEl.setAttribute('type', 'button');
        // Gán số thứ tự (1, 2, 3...) vào nút bấm. Đây là một hệ thống key khác, chỉ dùng cho giao diện.
        btnEl.setAttribute('key', key);
        btnEl.addEventListener('click', deleteTodo);
        liTag.appendChild(btnEl);

        const chkEl = document.createElement('input');
        chkEl.setAttribute('type', 'checkbox');
        // Checkbox cũng được gán key theo số thứ tự.
        chkEl.setAttribute('key', key);
        liTag.prepend(chkEl);

        olTag.appendChild(liTag);
        key++; // Tăng số thứ tự cho công việc tiếp theo.
    }
    const qtyEl = document.querySelector('.qty');
    qtyEl.innerHTML = todoList.length;
});

// --- BƯỚC 5: CÁC HÀM XỬ LÝ SỰ KIỆN ---

// Hàm xóa một công việc
const deleteTodo = (event) => {
    // Ý đồ của anh ở đây là:
    // event.target là cái NÚT BẤM.
    // event.target.parentElement là thẻ <li> chứa nút bấm đó.
    // Lấy ra key của thẻ <li> (là một số ngẫu nhiên) để gửi đi.
    const key = event.target.parentElement.getAttribute('key');
    // Gửi yêu cầu "remove" với payload là key ngẫu nhiên đó. Reducer sẽ tìm và xóa.
    store.dispatch({ type: 'remove', payload: key });
}

// Xử lý form thêm công việc
const formTag = document.querySelector("form");
formTag.onsubmit = function (e) {
    e.preventDefault();
    const inputTag = formTag.querySelector('input');
    const taskName = inputTag.value;
    // Tạo ra một key ngẫu nhiên, để định danh duy nhất cho mỗi công việc.
    const keyName = Math.floor(Math.random() * 10000);
    // Gửi yêu cầu "add" với payload là một object chứa cả key và tên.
    store.dispatch({ type: 'add', payload: { key: keyName, name: taskName } });
    this.reset(); // Xóa nội dung form sau khi submit.
}

// Xử lý nút "Check All"
const chkAllEl = document.querySelector('.chk-all');
chkAllEl.onclick = function () {
    const olEl = document.querySelector('#view-todolist');
    const unChkEls = olEl.querySelectorAll('input[type=checkbox]:not(:checked)');
    for (const unChkEl of unChkEls) {
        unChkEl.checked = true;
    }
}

// Xử lý nút "Delete" (xóa nhiều mục)
const deleteTodoListEl = document.querySelector('.delete-todolist');
deleteTodoListEl.onclick = function () {
    const olEl = document.querySelector('#view-todolist');
    const checkedEls = olEl.querySelectorAll('input[type=checkbox]:checked');
    // Lặp qua từng checkbox đã được chọn.
    for (const checkedEl of checkedEls) {
        // Với mỗi checkbox, tìm đến thẻ <li> cha của nó.
        const liEl = checkedEl.parentElement;
        // Lấy ra key ngẫu nhiên của thẻ <li> đó.
        const removeKey = liEl.getAttribute('key');
        // Gửi một yêu cầu xóa riêng lẻ cho từng công việc.
        store.dispatch({ type: 'remove', payload: removeKey });
    }
}