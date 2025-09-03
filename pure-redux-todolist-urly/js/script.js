// // Lấy công cụ `createStore` từ thư viện Redux.
// const { createStore } = window.Redux;

// // --- BƯỚC 1: KHO HÀNG BAN ĐẦU ---
// // Khởi tạo state là một mảng rỗng, sẵn sàng chứa các công việc.
// const initialState = [];

// // --- BƯỚC 2: THUÊ "THỦ KHO" (REDUCER) ---
// const todoListReducer = (state = initialState, action) => {
//     // Thủ kho xem loại yêu cầu trên phiếu là gì.
//     switch (action.type) {
//         // Nếu yêu cầu là "add"...
//         case "add":
//             // ...Thủ kho sẽ tạo ra một danh sách MỚI bằng cách:
//             // 1. Sao chép toàn bộ danh sách cũ (...state).
//             // 2. Thêm công việc mới (action.payload) vào cuối danh sách mới đó.
//             // 3. Trả về danh sách MỚI này.
//             return [...state, action.payload]; // Đây là cách viết tắt cho 3 dòng code cũ của anh

//         // Tạm thời chưa dùng đến case "remove"
//         // ... trong reducer ...
//         case "remove":
//             if (typeof(action.payload)=="number"){
//                  var newState = [...state];
//             const key = (action.payload);
//             // Sửa ở đây: Thêm dấu chấm phẩy vào cuối dòng
//             const index = key-1 ;
//             newState.splice(index, 1);
//             return newState;
//             }


//         // Nếu không phải yêu cầu "add", trả về kho như cũ.
//         default:
//             return state;
//     }
// }

// // --- BƯỚC 3: XÂY DỰNG "KHO" VÀ "GIAO DỊCH" ---
// let store = createStore(todoListReducer);

// // In ra trạng thái ban đầu để kiểm tra. Kết quả: [] (mảng rỗng)
// console.log(store.getState());

// // --- BƯỚC 4: LẮP "CAMERA AN NINH" (SUBSCRIBE) ---
// // `store.subscribe` sẽ đăng ký một hàm. Hàm này sẽ tự động được gọi
// // MỖI KHI dữ liệu trong kho (store) có sự thay đổi.
// store.subscribe(() => {
//     // Lấy danh sách công việc mới nhất từ kho.
//     const todoList = store.getState();
//     const olTag = document.getElementById("view-todolist");

//     // "Tổng vệ sinh" danh sách cũ trên giao diện trước khi hiển thị danh sách mới.
//     // Bước này cực kỳ quan trọng để tránh dữ liệu bị lặp lại.
//     olTag.innerHTML = '';

//     let key = 1;
//     // Lặp qua từng công việc trong danh sách mới và tạo thẻ <li> tương ứng.
//     for (const todo of todoList) {
//         var liTag = document.createElement("li");
//         liTag.textContent = todo;

//         // tạo thêm nút xoá ở kế bên task
//         const btnEl = document.createElement("button");
//         btnEl.textContent = "delete";
//         btnEl.setAttribute("type", "button");
//         btnEl.setAttribute("key", key);
//         btnEl.addEventListener("click", deleteTodo);
//         liTag.appendChild(btnEl);  // gắn btn vào li

//         // add thêm checkbox để hỗ trợ xoá item 
//         const chkEl = document.createElement("input");
//         chkEl.setAttribute("type", "checkbox");
//         chkEl.setAttribute("key", key);
//         liTag.prepend(chkEl);

//         olTag.appendChild(liTag);
//         key++;
//     }
//     // console.log(store.getState());
//     // số lượng task
//     const qtyEl = document.querySelector(".qty");
//     // qtyEl.innerHTML = todoList.length;
// });

// // hàm xoá task
// const deleteTodo = (event) => {
//     const key = event.target.getAttribute("key");
//     store.dispatch({ type: "remove", payload: key });
// }

// // --- BƯỚC 5: XỬ LÝ SỰ KIỆN NGƯỜI DÙNG ---
// // Lấy ra thẻ <form>
// const formTag = document.querySelector("form");
// // Gán sự kiện khi người dùng submit form (nhấn Enter hoặc bấm nút)
// formTag.onsubmit = function (e) {
//     // Ngăn trình duyệt tải lại trang (hành vi mặc định của form).
//     e.preventDefault();

//     const inputTag = formTag.querySelector("input");
//     const taskName = inputTag.value;

//     // Gửi "phiếu yêu cầu" loại "add" đến cho "thủ kho",
//     // kèm theo "hàng hóa" là tên công việc.
//     store.dispatch({ type: "add", payload: taskName });

//     // Xóa nội dung trong ô input để người dùng tiện nhập công việc mới.
//     inputTag.value = '';
// }

// const chkAllEl = document.querySelector(".chk-all");
// chkAllEl.onclick = function () {
//     const olEl = document.querySelector("#view-todolist");
//     // lấy ra các ô chưa được checked
//     const unChkEls = olEl.querySelectorAll("input[type=checkbox]:not(:checked)");
//     // checked từng ô đã lấy ra ở trên
//     for (const unChkEl of unChkEls) {
//         unChkEl.checked = true;
//     }
// }
// const deleteTodoListEl = document.querySelector(".delete-todolist");
// deleteTodoListEl.onclick = function () {
//     const olEl = document.querySelector("#view-todolist");
//     const checkedEls = olEl.querySelectorAll("input[type=checkbox]:checked");
//     const keys=[];
//     for (const checkedEl of checkedEls) {
//         let key= checkedEl.getAttribute("key");
//         keys.push(key);

//     }
//     store.dispatch({ type: "remove", payload: keys });
// }




// // Lấy công cụ `createStore` từ thư viện Redux. Nó là "tổng công ty" để xây dựng kho hàng.
// const { createStore } = window.Redux;

// // --- BƯỚC 1: KHO HÀNG BAN ĐẦU ---
// // Khởi tạo state là một mảng rỗng, giống như một danh sách công việc trống trơn lúc ban đầu.
// const initialState = [];

// // --- BƯỚC 2: THUÊ "THỦ KHO" (REDUCER) ---
// // Reducer là một hàm, đóng vai trò như một người "thủ kho" siêu mẫn cán.
// const todoListReducer = (state = initialState, action) => {
//     // Thủ kho xem loại yêu cầu trên phiếu (action.type) là gì.
//     switch (action.type) {
//         // Nếu yêu cầu là "add"...
//         case "add":
//             // ...Thủ kho sẽ trả về một danh sách MỚI, bao gồm tất cả công việc cũ (...state) và thêm công việc mới (action.payload) vào cuối.
//             return [...state, action.payload];

//         // Nếu yêu cầu là "remove"...
//         case "remove":
//             // ...Thủ kho sẽ tạo một bản sao của danh sách cũ để không làm ảnh hưởng "bản gốc".
//             var newState = [...state];
//             // Lấy vị trí (key) từ phiếu yêu cầu và đổi nó thành kiểu SỐ.
//             const key = Number(action.payload);
//             // Tính ra vị trí thực sự trong mảng (vì mảng bắt đầu từ 0).
//             const index = key - 1;
//             // Dùng "kéo cắt" splice để xóa 1 công việc tại đúng vị trí đó.
//             newState.splice(index, 1);
//             // Trả về danh sách mới đã được cắt bớt.
//             return newState;

//         // Nếu không phải các yêu cầu trên, không làm gì cả, trả về kho như cũ.
//         default:
//             return state;
//     }
// }

// // --- BƯỚC 3: XÂY DỰNG "KHO" ---
// // Tạo ra kho hàng thật sự và giao cho "thủ kho" todoListReducer quản lý.
// let store = createStore(todoListReducer);

// // In ra trạng thái ban đầu để kiểm tra.
// console.log(store.getState());

// // --- BƯỚC 4: LẮP "CAMERA AN NINH" ĐỂ CẬP NHẬT GIAO DIỆN ---
// // `store.subscribe` đăng ký một hàm. Hàm này sẽ tự động chạy MỖI KHI dữ liệu trong kho có thay đổi.
// store.subscribe(() => {
//     // Lấy danh sách công việc mới nhất từ kho.
//     const todoList = store.getState();
//     const olTag = document.getElementById("view-todolist");

//     // "Tổng vệ sinh" toàn bộ danh sách cũ trên giao diện trước khi vẽ lại danh sách mới.
//     olTag.innerHTML = '';

//     // Tự tạo một biến `key` bắt đầu từ 1 để đánh số thứ tự cho các công việc.
//     let key = 1;
//     // Lặp qua từng công việc trong danh sách mới.
//     for (const todo of todoList) {
//         // Với mỗi công việc, tạo một thẻ <li> (một dòng).
//         var liTag = document.createElement("li");
//         liTag.textContent = todo;

//         // Tạo một nút "delete" riêng cho dòng này.
//         const btnEl = document.createElement("button");
//         btnEl.textContent = "delete";
//         btnEl.setAttribute("type", "button");
//         // Gán số thứ tự (key) vào nút để biết nó thuộc dòng nào.
//         btnEl.setAttribute("key", key);
//         // Gắn "cái điều khiển từ xa" (hàm deleteTodo) vào sự kiện click của nút.
//         btnEl.addEventListener("click", deleteTodo);
//         // Gắn nút "delete" vào cuối thẻ <li>.
//         liTag.appendChild(btnEl);

//         // Tạo một ô checkbox riêng cho dòng này.
//         const chkEl = document.createElement("input");
//         chkEl.setAttribute("type", "checkbox");
//         // Gán luôn số thứ tự vào checkbox để lát nữa biết đường mà xóa.
//         chkEl.setAttribute("key", key);
//         // Gắn checkbox vào đầu thẻ <li>.
//         liTag.prepend(chkEl);

//         // Gắn thẻ <li> hoàn chỉnh vào danh sách <ol> trên giao diện.
//         olTag.appendChild(liTag);
//         // Tăng số thứ tự lên cho công việc tiếp theo.
//         key++;
//     }
// });

// // --- BƯỚC 5: CÁC HÀM XỬ LÝ SỰ KIỆN ---

// // Hàm này được gọi khi một nút "delete" bất kỳ được bấm.
// const deleteTodo = (event) => {
//     // Lấy ra số thứ tự (key) đã được lưu trên nút vừa bấm.
//     const key = event.target.getAttribute("key");
//     // Gửi "phiếu yêu cầu" loại "remove" đến thủ kho, kèm theo số thứ tự của công việc cần xóa.
//     store.dispatch({ type: "remove", payload: key });
// }

// // Lấy ra thẻ <form>.
// const formTag = document.querySelector("form");
// // Gán sự kiện khi người dùng submit form.
// formTag.onsubmit = function (e) {
//     // Ngăn trình duyệt tải lại trang.
//     e.preventDefault();

//     const inputTag = formTag.querySelector("input");
//     const taskName = inputTag.value;

//     // Gửi "phiếu yêu cầu" loại "add" đến thủ kho, kèm theo tên công việc.
//     store.dispatch({ type: "add", payload: taskName });

//     // Xóa nội dung trong ô input.
//     inputTag.value = '';
// }

// // Lấy ra nút "All".
// const chkAllEl = document.querySelector(".chk-all");
// // Gán sự kiện click cho nút "All".
// chkAllEl.onclick = function () {
//     const olEl = document.querySelector("#view-todolist");
//     // Tìm tất cả các checkbox nào CHƯA được tích.
//     const unChkEls = olEl.querySelectorAll("input[type=checkbox]:not(:checked)");
//     // Lặp qua từng checkbox vừa tìm được và tick vào nó.
//     for (const unChkEl of unChkEls) {
//         unChkEl.checked = true;
//     }
// }

// // Lấy ra nút "Delete".
// const deleteTodoListEl = document.querySelector(".delete-todolist");
// // Gán sự kiện click cho nút "Delete".
// deleteTodoListEl.onclick = function () {
//     const olEl = document.querySelector("#view-todolist");
//     // Tìm tất cả các checkbox nào ĐÃ được tích.
//     const checkedEls = olEl.querySelectorAll("input[type=checkbox]:checked");

//     // BẮT ĐẦU LẶP NGƯỢC TỪ CUỐI LÊN ĐẦU.
//     // Đây là "chiêu" để tránh lỗi xóa sai vị trí.
//     for (let i = checkedEls.length - 1; i >= 0; i--) {
//         const checkedEl = checkedEls[i];
//         // Lấy ra số thứ tự của checkbox đang được xử lý.
//         let key = checkedEl.getAttribute("key");
//         // Gửi yêu cầu xóa cho công việc có số thứ tự đó.
//         store.dispatch({ type: "remove", payload: key });
//     }
// }



// cách giống thầy lôc

// Lấy công cụ `createStore` từ thư viện Redux.
// const { createStore } = window.Redux;

// // --- BƯỚC 1: KHO HÀNG BAN ĐẦU ---
// const initialState = [];

// // --- BƯỚC 2: THUÊ "THỦ KHO" (REDUCER) ---
// const todoListReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case "add":
//             return [...state, action.payload];

//         case "remove":
//             // SỬA LẠI REDUCER ĐỂ XỬ LÝ CẢ TRƯỜNG HỢP XÓA 1 MỤC VÀ XÓA NHIỀU MỤC
//             // payload có thể là một số (key của 1 item) hoặc một mảng số (keys của nhiều item).
//             if (typeof (action.payload) === 'number') {
//                 // Xử lý khi payload là một số (xóa 1 item)
//                 const indexToRemove = Number(action.payload) - 1; // Chuyển key sang index dựa trên 0
//                 const newState = [...state];
//                 newState.splice(indexToRemove, 1);
//                 return newState;
//             } else if (Array.isArray(action.payload)) {
//                 // Xử lý khi payload là một MẢNG các key (xóa nhiều item)
//                 const keysToDelete = action.payload; // Mảng chứa các key (dựa trên 1) cần xóa

//                 // Lọc ra các công việc không nằm trong danh sách cần xóa.
//                 // Đối với mỗi item trong state, kiểm tra xem key của nó có nằm trong keysToDelete không.
//                 // Vì state không lưu key, chúng ta phải tái tạo lại key (index + 1) để so sánh.
//                 // Lưu ý: filter tạo ra một mảng mới, đây là cách xử lý immutable trong Redux.
//                 return state.filter((todo, index) => {
//                     const currentKey = index + 1; // Tính key dựa trên 1 cho item hiện tại
//                     return !keysToDelete.includes(currentKey); // Giữ lại nếu key KHÔNG nằm trong danh sách xóa
//                 });
//             }
//             // Mặc định trả về state nếu payload không phải là số hay mảng.
//             return state;

//         default:
//             return state;
//     }
// }

// // --- BƯỚC 3: XÂY DỰNG "KHO" ---
// const store = createStore(todoListReducer);

// // --- BƯỚC 4: LẮP "CAMERA AN NINH" ĐỂ CẬP NHẬT GIAO DIỆN ---
// store.subscribe(() => {
//     const todoList = store.getState();
//     const olTag = document.getElementById("view-todolist");
//     olTag.innerHTML = '';

//     let key = 1; // Tự tạo key bắt đầu từ 1.
//     for (const todo of todoList) {
//         const liTag = document.createElement("li");

//         const chkEl = document.createElement("input");
//         chkEl.setAttribute("type", "checkbox");
//         chkEl.setAttribute("key", key); // Gán key cho checkbox
//         liTag.prepend(chkEl);

//         liTag.append(` ${todo} `);

//         const btnEl = document.createElement("button");
//         btnEl.textContent = "delete";
//         btnEl.setAttribute("type", "button");
//         btnEl.setAttribute("key", key); // Gán key cho nút xóa
//         btnEl.addEventListener("click", deleteTodoSingle); // Gọi hàm xóa 1 mục
//         liTag.appendChild(btnEl);

//         olTag.appendChild(liTag);
//         key++;
//     }
// });

// // --- BƯỚC 5: CÁC HÀM XỬ LÝ SỰ KIỆN ---

// // Hàm này được gọi khi bấm nút "delete" của TỪNG MỤC.
// const deleteTodoSingle = (event) => {
//     const key = event.target.getAttribute("key");
//     // Gửi yêu cầu xóa 1 mục, payload là key (số)
//     store.dispatch({ type: "remove", payload: Number(key) });
// }

// const formTag = document.querySelector("form");
// formTag.onsubmit = function (e) {
//     e.preventDefault();
//     const inputTag = formTag.querySelector("input");
//     const taskName = inputTag.value.trim();
//     if (taskName) {
//         store.dispatch({ type: "add", payload: taskName });
//         inputTag.value = '';
//     }
// }

// const chkAllEl = document.querySelector(".chk-all");
// chkAllEl.onclick = function () {
//     const olEl = document.querySelector("#view-todolist");
//     const unChkEls = olEl.querySelectorAll("input[type=checkbox]:not(:checked)");
//     for (const unChkEl of unChkEls) {
//         unChkEl.checked = true;
//     }
// }

// // Xử lý nút "Delete" (xóa NHIỀU MỤC ĐÃ CHỌN)
// const deleteTodoListEl = document.querySelector(".delete-todolist");
// deleteTodoListEl.onclick = function () {
//     const olEl = document.querySelector("#view-todolist");
//     const checkedEls = olEl.querySelectorAll("input[type=checkbox]:checked");

//     const keysToDelete = []; // Mảng để lưu trữ tất cả các key của item cần xóa
//     for (const checkedEl of checkedEls) {
//         let key = checkedEl.getAttribute("key");
//         keysToDelete.push(Number(key)); // Đẩy key vào mảng, chuyển sang kiểu số
//     }

//     // Gửi yêu cầu "remove" ĐẶC BIỆT, payload là một MẢNG các key cần xóa.
//     store.dispatch({ type: "remove", payload: keysToDelete });
// }

// // Gọi subscribe một lần ban đầu để render giao diện trống.
// // (Có thể dispatch một action không làm gì cả để kích hoạt subscribe)
// store.dispatch({ type: 'INIT' });

const { createStore } = window.Redux;
// action là object vd: {type: 'increment'}
const initialState = [];
const todoListReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'add':
            var newState = [];
            for (const el of state) {
                newState.push({ ...el });
            }

            newState.push({ ...action.payload }); // hàm thêm phần tử
            return newState;
        case 'remove':
            var newState = [];
            for (const el of state) {
                const removeKey = Number(action.payload);
                if (el.key != removeKey) {
                    newState.push({ ...el });
                }
            }
            return newState;
        default:
            return state;
    }
}
let store = createStore(todoListReducer);
store.subscribe(() => {
    const todoList = store.getState();
    const olTag = document.querySelector("#view-todolist");
    olTag.innerHTML = '';
    let key = 1;
    for (const todo of todoList) {
        const liTag = document.createElement('li');
        liTag.textContent = todo.name;
        liTag.setAttribute('key', todo.key);
        const btnEl = document.createElement('button');
        btnEl.textContent = 'Xóa';
        btnEl.setAttribute('type', 'button');
        btnEl.setAttribute('key', key);
        btnEl.addEventListener('click', deleteTodo);
        liTag.appendChild(btnEl);
        //add thêm checkbox
        const chkEl = document.createElement('input');
        chkEl.setAttribute('type', 'checkbox');
        chkEl.setAttribute('key', key);
        liTag.prepend(chkEl);
        olTag.appendChild(liTag);
        key++;
    }
    const qtyEl = document.querySelector('.qty');
    qtyEl.innerHTML = todoList.length;
});
const deleteTodo = (event) => {
    const key = event.target.parentElement.getAttribute('key');
    store.dispatch({ type: 'remove', payload: key });

}
const formTag = document.querySelector("form");
formTag.onsubmit = function (e) {
    e.preventDefault();
    const inputTag = formTag.querySelector('input');
    const taskName = inputTag.value;
    const keyName = Math.floor(Math.random() * 10000);
    store.dispatch({ type: 'add', payload: { key: keyName, name: taskName } });
    this.reset();
}
const chkAllEl = document.querySelector('.chk-all');
chkAllEl.onclick = function () {
    const olEl = document.querySelector('#view-todolist');
    const unChkEls = olEl.querySelectorAll('input[type=checkbox]:not(:checked)');
    for (const unChkEl of unChkEls) {
        unChkEl.checked = true;
    }
}
const deleteTodoListEl = document.querySelector('.delete-todolist');
deleteTodoListEl.onclick = function () {
    const olEl = document.querySelector('#view-todolist');
    const checkedEls = olEl.querySelectorAll('input[type=checkbox]:checked');
    for (const checkedEl of checkedEls) {
        const liEl = checkedEl.parentElement;
        const removeKey = liEl.getAttribute('key');
        store.dispatch({ type: 'remove', payload: removeKey });
    }
}
