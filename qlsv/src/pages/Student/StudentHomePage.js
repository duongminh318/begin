import React, { useEffect, useState } from 'react';
import StudentList from '../../components/Student/StudentList';
import Search from '../../components/Search';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



const StudentHomePage = () => {

    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState("");
    const list = useSelector(state => state.studentReducer.list);
    const dispatch = useDispatch();


    useEffect(() => {




        // Thực hiện cuộc gọi API để lấy danh sách sinh viên.
        fetch('https://65d036e5ab7beba3d5e2df7e.mockapi.io/api/v1/students')
            // Khi nhận được phản hồi từ server, chuyển đổi nó sang định dạng JSON.
            .then(result => result.json())
            // Khi dữ liệu JSON đã sẵn sàng...
            .then((result) => {
                // ...cập nhật state: gán dữ liệu vào studentList và đặt isLoaded thành true.
                // Việc gọi setState sẽ khiến component re-render (vẽ lại).
                setIsLoaded(true)
                dispatch({ type: "search", payload: { keyword: "", list: result } });
            })


            // Nếu có lỗi trong quá trình fetch hoặc xử lý JSON...
            .catch(error => {
                // ...cập nhật state: lưu lỗi và đặt isLoaded thành true (vì quá trình đã kết thúc, dù có lỗi).
                setError(error);
            }


            );

    }, [])






    // --- XỬ LÝ TRẠNG THÁI LOADING, LỖI TRƯỚC KHI HIỂN THỊ DỮ LIỆU ---

    // Điều kiện 1: Kiểm tra trạng thái tải
    // Nếu `isLoaded` là `false` (tức là dữ liệu chưa tải xong)...
    if (!isLoaded) {
        // ...thì lập tức return JSX này. Các đoạn code phía dưới sẽ không được thực thi.
        return <div className="text-success">Loading...</div>; // ...hiển thị thông báo "Loading...".
    }
    // Điều kiện 2: Nếu không phải đang tải, thì kiểm tra xem có lỗi không.
    // `else if` đảm bảo chỉ kiểm tra lỗi khi đã tải xong (hoặc có lỗi xảy ra trong quá trình tải).
    // Nếu `error` không phải là `null` hoặc `undefined` (tức là có lỗi)...
    else if (error) {
        // ...thì lập tức return JSX này. Các đoạn code phía dưới sẽ không được thực thi.
        return <div className="text-danger">{error.message || 'Có lỗi xảy ra'}</div>; // ...hiển thị thông báo lỗi.
    }
    return (
        <div>
            <h1>Danh sách sinh viên</h1>
            <NavLink to="/student/create"
                className="btn btn-info">
                Add
            </NavLink>
            <Search />
            <StudentList list={list} />
        </div>
    )
}

export default StudentHomePage;