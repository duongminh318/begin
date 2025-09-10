
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import Message from '../../components/Message';

export default function StudentCreatePage() {
    const [message, setMessage] = useState(null);
    const [isError, setIsError] = useState(false);
    const formik = useFormik({
        initialValues: {
            name: '',
            birthday: '',
            gender: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Vui lòng nhập tên'),
            birthday: Yup.string()
                .required('Vui lòng nhập ngày sinh'),
            gender: Yup.string()
                .required('Vui lòng chọn giới tính'),
        }),
        onSubmit: values => {
            handleSubmitForm(values)
        },
    });
    const handleSubmitForm = (data) => {
        setMessage('Đang xử lí');
        //call api
        fetch("https://65d036e5ab7beba3d5e2df7e.mockapi.io/api/v1/students", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(result =>{
                setMessage('Đã tạo sinh viên thành công')
                setIsError(false)
            })
            .catch(error => {
                setMessage(error)
                setIsError(true)
            })
    }
    return (
        <>
            <div>
                {message ? <Message isError={isError}>{message}</Message> : ""}
                <h1>Thêm sinh viên</h1>
                <form onSubmit={formik.handleSubmit} method="POST">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5">
                                <div className="form-group">
                                    <label>Tên</label>
                                    <input type="text" className="form-control" placeholder="Tên của bạn" name="name"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.name}
                                    />
                                    {formik.touched.name && formik.errors.name ? (
                                        <div className="text-danger">{formik.errors.name}</div>
                                    ) : null}
                                </div>
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
