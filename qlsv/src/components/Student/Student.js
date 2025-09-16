// Import thư viện React và đối tượng Component từ React.
// Class Component cần import { Component } để kế thừa.
import React, { Component } from 'react';
import { useDispatch } from 'react-redux';
// Định nghĩa một Class Component có tên là Student.
// Component này sẽ hiển thị thông tin của MỘT sinh viên.

// Xuất component Student ra để các component khác có thể import và sử dụng.


const Student = (props) => {
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        // alert(id);
        fetch(`https://65d036e5ab7beba3d5e2df7e.mockapi.io/api/v1/students/${id}`, {
            method: "DELETE",

        })

            .then((result) => {
                reloadData();
                window.location.href = "/";
            })
            .catch((error) => {

            });
    }


    const reloadData = () => {
        fetch('https://65d036e5ab7beba3d5e2df7e.mockapi.io/api/v1/students')
            // Khi nhận được phản hồi từ server, chuyển đổi nó sang định dạng JSON.
            .then(result => result.json())
            // Khi dữ liệu JSON đã sẵn sàng...
            .then((result) => {
                // ...cập nhật state: gán dữ liệu vào studentList và đặt isLoaded thành true.
                // Việc gọi setState sẽ khiến component re-render (vẽ lại).

                dispatch({
                    type: "search",
                    payload: { keyword: "", list: result }
                });
            })


            // Nếu có lỗi trong quá trình fetch hoặc xử lý JSON...
            .catch(error => {
                // ...cập nhật state: lưu lỗi và đặt isLoaded thành true (vì quá trình đã kết thúc, dù có lỗi).

            }
            );
    }

    return (
        // Trả về một phần tử <tr> (table row), là một hàng trong bảng HTML.
        <tr>
            {/* Hiển thị số thứ tự của sinh viên.
                    `this.props.order` là dữ liệu được truyền từ component cha xuống. */}
            <td>{props.order}</td>

            {/* Hiển thị ID của sinh viên.
                    `this.props.data` là một object chứa thông tin sinh viên,
                    và `this.props.data.id` là thuộc tính ID trong object đó. */}
            <td>{props.data.id}</td>

            {/* Hiển thị tên của sinh viên. */}
            <td>{props.data.name}</td>

            {/* Hiển thị ngày sinh của sinh viên. */}
            <td>{props.data.birthday}</td>

            {/* Hiển thị giới tính của sinh viên. */}
            <td>{props.data.gender}</td>

            {/* Cột chứa nút "Sửa".
                    - <a href="edit.html">Sửa</a>: Hiện tại đang dùng một thẻ <a> link cứng đến 'edit.html'.
                      Trong một ứng dụng React với React Router, thường sẽ dùng <Link to="/student/edit/ID_SINH_VIEN">
                      hoặc một Button với sự kiện onClick để điều hướng. */}
            <td><a className='btn btn-warning btn-sm ' href={`/student/${props.data.id}/edit`}>Sửa</a></td>

            {/* Cột chứa nút "Xóa".
                    - <a ...>Xóa</a>: Cũng là một thẻ <a> link cứng.
                    - data={1}: Đây là một prop không chuẩn của HTML (HTML không có `data` như vậy).
                      Trong React, để truyền ID để xóa, ta thường dùng `onClick` với một hàm xử lý,
                      hoặc dùng thuộc tính `data-id` của HTML (ví dụ: `data-id={this.props.data.id}`).
                    - className="delete": Gán class CSS.
                    - href="list.html": Link cứng đến 'list.html'.
                    - type="student": Thuộc tính không chuẩn của HTML, có thể là `data-type="student"`. */}
            <td><button data={1}
                className='btn btn-danger btn-sm '
                href="list.html"
                type="student"
                onClick={() => handleDelete(props.data.id)}>
                Xóa</button></td>
        </tr>
    );
}

export default Student;