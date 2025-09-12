// Import hook `useFormik` từ thư viện Formik.
// useFormik là trái tim của Formik, nó cung cấp tất cả các trạng thái và phương thức cần thiết để quản lý một form.
import { useFormik } from 'formik';

// Import hook `useState` từ thư viện React.
// useState được dùng để quản lý trạng thái cục bộ (local state) trong functional component,
// ví dụ như trạng thái hiển thị thông báo.
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';

// Import thư viện `yup` và đặt tên namespace là `Yup`.
// Yup là một thư viện schema validation (kiểm tra lỗi dữ liệu) rất phổ biến,
// thường được dùng cùng với Formik để định nghĩa các quy tắc cho từng trường input.
import * as Yup from 'yup';
import { useParams } from "react-router-dom"

// Import component Message tùy chỉnh.
// Component này dùng để hiển thị các thông báo (ví dụ: thành công, lỗi, đang xử lý) cho người dùng.
import Message from '../../components/Message';

// Định nghĩa Functional Component có tên là StudentCreatePage.
// `export default` giúp component này có thể được import và sử dụng ở các file React khác.
export default function StudentEditPage() {
    const params = useParams()
    console.log(params);
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
        //  fetch('https://65d036e5ab7beba3d5e2df7e.mockapi.io/api/v1/students')
        //     // Khi nhận được phản hồi từ server, chuyển đổi nó sang định dạng JSON.
        //     .then(result => result.json())
        //     // Khi dữ liệu JSON đã sẵn sàng...
        //     .then(result =>
        //         // ...cập nhật state: gán dữ liệu vào studentList và đặt isLoaded thành true.
        //         // Việc gọi setState sẽ khiến component re-render (vẽ lại).
        //         this.setState({ studentList: result, isLoaded: true })
        //     )
        //     // Nếu có lỗi trong quá trình fetch hoặc xử lý JSON...
        //     .catch(error =>
        //         // ...cập nhật state: lưu lỗi và đặt isLoaded thành true (vì quá trình đã kết thúc, dù có lỗi).
        //         this.setState({ error: error, isLoaded: true })
        //     );


    }

    // render xong mới chạy tới useEffect, và useEffect chỉ chạy 1 lần đầu tiên
    useEffect(() => {

        // call api


    }, [])

    // ------------------- PHẦN TRẢ VỀ JSX (GIAO DIỆN) CỦA COMPONENT -------------------

    return (
        // Fragment `<>` và `</>` được sử dụng để bọc nhiều phần tử JSX mà không thêm một thẻ HTML thừa nào vào DOM.

        <div>
            <div>
                <h1>Chỉnh sửa sinh viên</h1>
                <form onSubmit={formik.handleSubmit}>
                    <input type="hidden" name="id" defaultValue={1} />
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5">
                                <div className="form-group">
                                    <label>Tên</label>
                                    <input type="text" className="form-control"
                                        placeholder="Tên của bạn"
                                        name="name"
                                        value={formik.values.name}

                                        onChange={formik.handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Birthday</label>
                                    <input type="date"
                                        className="form-control"
                                        placeholder="Ngày sinh của bạn"
                                        name="birthday"


                                        onChange={formik.handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Chọn Giới tính</label>
                                    <select className="form-control" id="gender"
                                        name="" onChange={formik.handleChange}
                                        value={formik.values.gender}
                                    >
                                        <option value="">---</option>
                                        <option value="nam">Nam</option>
                                        <option value="nữ" >Nữ</option>
                                        <option value="khác">Khác</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-success" type="submit">Lưu</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        </div>

    )
}