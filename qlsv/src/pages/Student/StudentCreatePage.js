// Import hook `useFormik` từ thư viện Formik để quản lý state của form, validation và submit.
import { useFormik } from 'formik';
// Import hook `useState` từ React để quản lý state cục bộ trong functional component.
import React, { useState } from 'react';
// Import thư viện Yup, thường dùng kết hợp với Formik để định nghĩa schema kiểm tra lỗi (validation).
import * as Yup from 'yup';
// Import component Message tùy chỉnh để hiển thị thông báo (lỗi/thành công).
import Message from '../../components/Message';

// Định nghĩa Functional Component StudentCreatePage.
// `export default` giúp component này có thể được import ở các file khác.
export default function StudentCreatePage() {
    // Khởi tạo state `message` để lưu trữ nội dung thông báo hiển thị cho người dùng.
    const [message, setMessage] = useState(null);
    // Khởi tạo state `isError` để xác định thông báo là lỗi (true) hay thành công/đang xử lý (false).
    const [isError, setIsError] = useState(false);

    // Sử dụng hook `useFormik` để cấu hình form.
    const formik = useFormik({
        // Định nghĩa giá trị ban đầu cho các trường trong form.
        initialValues: {
            name: '',
            birthday: '',
            gender: ''
        },
        // Định nghĩa schema kiểm tra lỗi bằng Yup.
        validationSchema: Yup.object({
            // Trường 'name' là chuỗi và bắt buộc.
            name: Yup.string()
                .required('Vui lòng nhập tên'),
            // Trường 'birthday' là chuỗi và bắt buộc.
            birthday: Yup.string()
                .required('Vui lòng nhập ngày sinh'),
            // Trường 'gender' là chuỗi và bắt buộc.
            gender: Yup.string()
                .required('Vui lòng chọn giới tính'),
        }),
        // Hàm này được gọi khi form được submit hợp lệ (không có lỗi validation).
        onSubmit: values => {
            // Gọi hàm `handleSubmitForm` để xử lý việc gửi dữ liệu.
            handleSubmitForm(values)
        },
    });

    // Hàm xử lý việc gửi dữ liệu form lên API.
    const handleSubmitForm = (data) => {
        // Cập nhật thông báo cho người dùng là đang xử lý.
        setMessage('Đang xử lí');
        setIsError(false); // Đặt trạng thái không phải lỗi

        // Thực hiện gọi API để tạo sinh viên mới (HTTP POST request).
        fetch("https://65d036e5ab7beba3d5e2df7e.mockapi.io/api/v1/students", {
            method: "POST", // Chỉ định phương thức HTTP là POST.
            headers: {
                "Content-Type": "application/json", // Báo cho server biết dữ liệu gửi đi là JSON.
            },
            body: JSON.stringify(data), // Chuyển đổi object `data` thành chuỗi JSON và gửi đi.
        })
            .then(result => {
                // Nếu request thành công, cập nhật thông báo và trạng thái lỗi.
                setMessage('Đã tạo sinh viên thành công')
                setIsError(false)
                // TODO: Có thể reset form ở đây: formik.resetForm();
                // TODO: Có thể điều hướng về trang danh sách: navigate('/student');
            })
            .catch(error => {
                // Nếu có lỗi trong quá trình fetch, cập nhật thông báo lỗi và trạng thái lỗi.
                setMessage(`Có lỗi xảy ra: ${error.message || error}`); // Hiển thị thông báo lỗi chi tiết hơn
                setIsError(true)
            })
    }

    // Phần trả về JSX (giao diện) của component.
    return (
        <> {/* Fragment: Dùng để nhóm nhiều phần tử mà không thêm thẻ HTML thừa vào DOM. */}
            <div>
                {/* Hiển thị component Message nếu có `message`. */}
                {message ? <Message isError={isError}>{message}</Message> : ""}
                <h1>Thêm sinh viên</h1>
                {/* Form HTML, liên kết với Formik thông qua `onSubmit={formik.handleSubmit}`. */}
                <form onSubmit={formik.handleSubmit} method="POST">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5">
                                {/* Trường nhập tên */}
                                <div className="form-group">
                                    <label>Tên</label>
                                    <input type="text" className="form-control" placeholder="Tên của bạn" name="name"
                                        // Gán các handler và giá trị từ Formik vào input.
                                        onChange={formik.handleChange} // Cập nhật giá trị input vào state của Formik.
                                        onBlur={formik.handleBlur}   // Đánh dấu trường đã được chạm vào (để hiển thị lỗi).
                                        value={formik.values.name}   // Hiển thị giá trị hiện tại của trường từ Formik.
                                    />
                                    {/* Hiển thị thông báo lỗi nếu trường đã được chạm vào và có lỗi. */}
                                    {formik.touched.name && formik.errors.name ? (
                                        <div className="text-danger">{formik.errors.name}</div>
                                    ) : null}
                                </div>
                                {/* Trường nhập ngày sinh */}
                                <div className="form-group">
                                    <label>Birthday</label>
                                    <input type="date" className="form-control" placeholder="Ngày sinh của bạn" name="birthday"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.birthday}
                                    />
                                    {formik.touched.birthday && formik.errors.birthday ? (
                                        <div className="text-danger">{formik.errors.birthday}</div>
                                    ) : null}
                                </div>
                                {/* Trường chọn giới tính */}
                                <div className="form-group">
                                    <label>Chọn Giới tính</label>
                                    <select className="form-control" id="gender" name="gender"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.gender}
                                    >
                                        <option value="">---</option>
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                        <option value="khác">Khác</option>
                                    </select>
                                    {formik.touched.gender && formik.errors.gender ? (
                                        <div className="text-danger">{formik.errors.gender}</div>
                                    ) : null}
                                </div>
                                {/* Nút submit form */}
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