// Import hook `useFormik` từ thư viện Formik.
// useFormik là trái tim của Formik, nó cung cấp tất cả các trạng thái và phương thức cần thiết để quản lý một form.
import { useFormik } from 'formik';

// Import hook `useState` từ thư viện React.
// useState được dùng để quản lý trạng thái cục bộ (local state) trong functional component,
// ví dụ như trạng thái hiển thị thông báo.
import React, { useState } from 'react';

// Import thư viện `yup` và đặt tên namespace là `Yup`.
// Yup là một thư viện schema validation (kiểm tra lỗi dữ liệu) rất phổ biến,
// thường được dùng cùng với Formik để định nghĩa các quy tắc cho từng trường input.
import * as Yup from 'yup';

// Import component Message tùy chỉnh.
// Component này dùng để hiển thị các thông báo (ví dụ: thành công, lỗi, đang xử lý) cho người dùng.
import Message from '../../components/Message';

// Định nghĩa Functional Component có tên là StudentCreatePage.
// `export default` giúp component này có thể được import và sử dụng ở các file React khác.
export default function StudentCreatePage() {
    // ------------------- QUẢN LÝ TRẠNG THÁI CỤC BỘ (LOCAL STATE) -------------------

    // Khởi tạo state `message` bằng `useState`.
    // `message` sẽ chứa nội dung của thông báo muốn hiển thị (ví dụ: "Đã tạo sinh viên thành công").
    // Giá trị khởi tạo là `null`, tức là ban đầu không có thông báo nào.
    const [message, setMessage] = useState(null);

    // Khởi tạo state `isError` bằng `useState`.
    // `isError` là một boolean (true/false) để xác định xem thông báo có phải là lỗi không.
    // Giá trị khởi tạo là `false`, tức là ban đầu không phải lỗi.
    const [isError, setIsError] = useState(false);

    // ------------------- SỬ DỤNG HOOK `useFormik` ĐỂ QUẢN LÝ FORM -------------------

    // Gọi hook `useFormik` và truyền vào một object cấu hình.
    // `formik` là một object chứa các thuộc tính và phương thức để tương tác với form (values, errors, touched, handleChange, handleBlur, handleSubmit...).
    const formik = useFormik({
        // `initialValues`: Định nghĩa giá trị ban đầu cho TẤT CẢ các trường trong form.
        // Tên của các thuộc tính ở đây phải khớp với thuộc tính `name` của các thẻ input trong JSX.
        initialValues: {
            name: '',     // Tên sinh viên, ban đầu để trống
            birthday: '', // Ngày sinh, ban đầu để trống
            gender: ''    // Giới tính, ban đầu để trống
        },

        // `validationSchema`: Định nghĩa các quy tắc kiểm tra lỗi bằng thư viện Yup.
        // Đây là một object Yup schema, ánh xạ với `initialValues`.
        validationSchema: Yup.object({
            // Quy tắc cho trường `name`:
            name: Yup.string() // Phải là một chuỗi (string).
                .required('Vui lòng nhập tên'), // Là trường bắt buộc, nếu trống sẽ hiển thị thông báo này.

            // Quy tắc cho trường `birthday`:
            birthday: Yup.string() // Phải là một chuỗi (string).
                .required('Vui lòng nhập ngày sinh'), // Là trường bắt buộc.

            // Quy tắc cho trường `gender`:
            gender: Yup.string() // Phải là một chuỗi (string).
                .required('Vui lòng chọn giới tính'), // Là trường bắt buộc.
        }),

        // `onSubmit`: Hàm này sẽ được gọi KHI và CHỈ KHI form được submit và TẤT CẢ các trường đều hợp lệ
        // (đã vượt qua `validationSchema`).
        // `values` là một object chứa giá trị hiện tại của TẤT CẢ các trường trong form (ví dụ: `{ name: 'Tuan', birthday: '2000-01-01', gender: 'Nam' }`).
        onSubmit: values => {
            // thử nghiệm
            // alert(JSON.stringify(values, null , 2));
            // Gọi hàm `handleSubmitForm` riêng để xử lý logic gửi dữ liệu lên API.
            handleSubmitForm(values)

        },
    });

    // ------------------- HÀM XỬ LÝ GỬI DỮ LIỆU LÊN API -------------------

    // Hàm `handleSubmitForm` nhận vào `data` (chính là `values` từ Formik).
    const handleSubmitForm = (data) => {
        // Cập nhật state `message` để hiển thị trạng thái "Đang xử lý".
        setMessage('Đang xử lí');
        // Đặt `isError` thành `false` vì đây là trạng thái đang xử lý, chưa có lỗi.
        setIsError(false);

        // Thực hiện cuộc gọi API sử dụng `fetch` để gửi dữ liệu sinh viên mới.
        fetch("https://65d036e5ab7beba3d5e2df7e.mockapi.io/api/v1/studentsss", {
            method: "POST", // Chỉ định phương thức HTTP là POST (để tạo tài nguyên mới).
            headers: {
                // Thiết lập header `Content-Type` để báo cho server biết định dạng dữ liệu gửi đi là JSON.
                "Content-Type": "application/json",
            },
            // Chuyển đổi object `data` (chứa thông tin sinh viên) thành một chuỗi JSON
            // và đặt nó vào phần `body` của request.
            body: JSON.stringify(data),
        })
            // Xử lý phản hồi từ server sau khi request hoàn thành.
            .then(result => {
                // Nếu request thành công, cập nhật thông báo và trạng thái lỗi.
                setMessage('Đã tạo sinh viên thành công');
                setIsError(false); // Đặt lại isError thành false (thành công).
                // TODO: Có thể thêm các hành động sau khi tạo thành công ở đây:
                //   - `formik.resetForm()`: Để xóa các giá trị trong form sau khi submit.
                //   - `navigate('/student')`: Để điều hướng người dùng quay lại trang danh sách sinh viên.
                
            })
            // Bắt lỗi nếu có vấn đề trong quá trình gửi request hoặc nhận phản hồi.
            .catch(error => {
                // Cập nhật thông báo lỗi và đặt `isError` thành `true`.
                // Dùng `error.message || error` để đảm bảo hiển thị được thông báo lỗi từ object `error`.
                setMessage(`Có lỗi xảy ra: ${error.message || error}`);
                setIsError(true);
            })
    }

    // ------------------- PHẦN TRẢ VỀ JSX (GIAO DIỆN) CỦA COMPONENT -------------------

    return (
        // Fragment `<>` và `</>` được sử dụng để bọc nhiều phần tử JSX mà không thêm một thẻ HTML thừa nào vào DOM.
        <>
            <div>
                {/* Hiển thị component `Message` nếu `message` không phải là `null` hoặc chuỗi rỗng.
                    `isError` prop được truyền vào để Message biết cần hiển thị kiểu thông báo lỗi hay thành công. */}
                {message ? <Message isError={isError}>{message}</Message> : ""}

                <h1>Thêm sinh viên</h1>

                {/* Định nghĩa form HTML.
                    - `onSubmit={formik.handleSubmit}`: Khi form được submit, Formik sẽ tự động gọi hàm `handleSubmit` của nó.
                                                         Hàm này sẽ chạy `validationSchema` và sau đó gọi `onSubmit` của `useFormik` nếu hợp lệ.
                    - `method="POST"`: Thuộc tính HTML, không bắt buộc với React/Formik nhưng là một practice tốt. */}
                <form onSubmit={formik.handleSubmit} method="POST">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5">
                                {/* NHÓM TRƯỜNG NHẬP TÊN */}
                                <div className="form-group">
                                    <label>Tên</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Tên của bạn"
                                        name="name" // Thuộc tính `name` PHẢI khớp với `initialValues` và `validationSchema` của Formik.
                                        onChange={formik.handleChange} // Formik tự động cập nhật `formik.values.name` khi người dùng gõ.
                                        onBlur={formik.handleBlur}   // Formik tự động đánh dấu `formik.touched.name` khi người dùng rời khỏi input.
                                        value={formik.values.name}   // Hiển thị giá trị hiện tại của trường `name` từ Formik.
                                    />
                                    {/* Hiển thị lỗi nếu trường `name` đã được "chạm vào" (`touched`) VÀ có lỗi (`errors`). */}
                                    {formik.touched.name && formik.errors.name ? (
                                        <div className="text-danger">{formik.errors.name}</div>
                                    ) : null}
                                </div>

                                {/* NHÓM TRƯỜNG NHẬP NGÀY SINH */}
                                <div className="form-group">
                                    <label>Birthday</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        placeholder="Ngày sinh của bạn"
                                        name="birthday" // Tương tự, `name` phải khớp.
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.birthday}
                                    />
                                    {formik.touched.birthday && formik.errors.birthday ? (
                                        <div className="text-danger">{formik.errors.birthday}</div>
                                    ) : null}
                                </div>

                                {/* NHÓM TRƯỜNG CHỌN GIỚI TÍNH */}
                                <div className="form-group">
                                    <label>Chọn Giới tính</label>
                                    <select
                                        className="form-control"
                                        id="gender"
                                        name="gender" // `name` phải khớp.
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.gender}
                                    >
                                        <option value="">---</option> {/* Option rỗng để người dùng phải chọn */}
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                        <option value="khác">Khác</option>
                                    </select>
                                    {formik.touched.gender && formik.errors.gender ? (
                                        <div className="text-danger">{formik.errors.gender}</div>
                                    ) : null}
                                </div>

                                {/* NHÓM NÚT SUBMIT */}
                                <div className="form-group">
                                    <button className="btn btn-success" type="submit">Lưu</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}