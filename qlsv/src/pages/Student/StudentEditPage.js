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
import { useNavigate } from "react-router-dom";

// Định nghĩa Functional Component có tên là StudentCreatePage.
// `export default` giúp component này có thể được import và sử dụng ở các file React khác.
export default function StudentEditPage() {
    let navigate = useNavigate();
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
    const [isLoaded, setIsLoaded] = useState(false);

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

            // name: Yup.number().typeError("chỗ này phải là số nha thím") // Phải là một chuỗi (string).
            //     .required('Vui lòng nhập tên'), // Là trường bắt buộc, nếu trống sẽ hiển thị thông báo này.

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
        fetch(`https://65d036e5ab7beba3d5e2df7e.mockapi.io/api/v1/students/${params.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((result) => {
                navigate({
                    pathname: "/student", state: {
                        message: "Thím đã Update thành công ",
                        isError: false
                    }
                });
               
            })
            .catch((error) => {
                setMessage(`Có lỗi xảy ra: ${error.message || error}`);
                setIsError(true);
            });
    };





    // render xong mới chạy tới useEffect, và useEffect chỉ chạy 1 lần đầu tiên
    useEffect(() => {

        // call api
        fetch(`https://65d036e5ab7beba3d5e2df7e.mockapi.io/api/v1/students/${params.id}`)
            // Khi nhận được phản hồi từ server, chuyển đổi nó sang định dạng JSON.
            .then(result => result.json())
            // Khi dữ liệu JSON đã sẵn sàng...
            .then(result => {
                setIsError(false);
                formik.values.name = result.name;
                formik.values.birthday = result.birthday;
                formik.values.gender = result.gender;
                setIsLoaded(true);
            })
            // Nếu có lỗi trong quá trình fetch hoặc xử lý JSON...
            .catch(error =>
            // ...cập nhật state: lưu lỗi và đặt isLoaded thành true (vì quá trình đã kết thúc, dù có lỗi).
            {
                console.log(error);
            }
            );


    }, []);

    if (!isLoaded) {
        // ...thì lập tức return JSX này. Các đoạn code phía dưới sẽ không được thực thi.
        return <div className="text-success">Loading...</div>; // ...hiển thị thông báo "Loading...".
    }
    // Điều kiện 2: Nếu không phải đang tải, thì kiểm tra xem có lỗi không.
    // `else if` đảm bảo chỉ kiểm tra lỗi khi đã tải xong (hoặc có lỗi xảy ra trong quá trình tải).
    // Nếu `error` không phải là `null` hoặc `undefined` (tức là có lỗi)...
    else if (isError) {
        // ...thì lập tức return JSX này. Các đoạn code phía dưới sẽ không được thực thi.
        return <div className="text-danger">{message || 'Có lỗi xảy ra'}</div>; // ...hiển thị thông báo lỗi.
    }

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
                                    {formik.touched.name && formik.errors.name ? (
                                        <div className="text-danger">{formik.errors.name}</div>
                                    ) : null}
                                </div>
                                <div className="form-group">
                                    <label>Birthday</label>
                                    <input type="date"
                                        className="form-control"
                                        placeholder="Ngày sinh của bạn"
                                        name="birthday"

                                        value={formik.values.birthday}

                                        onChange={formik.handleChange}
                                    />
                                    {formik.touched.birthday && formik.errors.birthday ? (
                                        <div className="text-danger">{formik.errors.birthday}</div>
                                    ) : null}
                                </div>
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