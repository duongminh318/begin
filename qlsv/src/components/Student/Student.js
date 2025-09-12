// Import thư viện React và đối tượng Component từ React.
// Class Component cần import { Component } để kế thừa.
import React, { Component } from 'react';

// Định nghĩa một Class Component có tên là Student.
// Component này sẽ hiển thị thông tin của MỘT sinh viên.
class Student extends Component {

    // Phương thức `render()` là bắt buộc trong mọi Class Component.
    // Nó định nghĩa những gì component này sẽ hiển thị ra trên giao diện.
    render() {
        console.log(this.props.data);   // hiển thị ra xem dữ liệu gồm những gì
        return (
            // Trả về một phần tử <tr> (table row), là một hàng trong bảng HTML.
            <tr>
                {/* Hiển thị số thứ tự của sinh viên.
                    `this.props.order` là dữ liệu được truyền từ component cha xuống. */}
                <td>{this.props.order}</td>

                {/* Hiển thị ID của sinh viên.
                    `this.props.data` là một object chứa thông tin sinh viên,
                    và `this.props.data.id` là thuộc tính ID trong object đó. */}
                <td>{this.props.data.id}</td>

                {/* Hiển thị tên của sinh viên. */}
                <td>{this.props.data.name}</td>

                {/* Hiển thị ngày sinh của sinh viên. */}
                <td>{this.props.data.birthday}</td>

                {/* Hiển thị giới tính của sinh viên. */}
                <td>{this.props.data.gender}</td>

                {/* Cột chứa nút "Sửa".
                    - <a href="edit.html">Sửa</a>: Hiện tại đang dùng một thẻ <a> link cứng đến 'edit.html'.
                      Trong một ứng dụng React với React Router, thường sẽ dùng <Link to="/student/edit/ID_SINH_VIEN">
                      hoặc một Button với sự kiện onClick để điều hướng. */}
                <td><a className='btn btn-warning btn-sm ' href={`/student/${this.props.data.id}/edit`}>Sửa</a></td>

                {/* Cột chứa nút "Xóa".
                    - <a ...>Xóa</a>: Cũng là một thẻ <a> link cứng.
                    - data={1}: Đây là một prop không chuẩn của HTML (HTML không có `data` như vậy).
                      Trong React, để truyền ID để xóa, ta thường dùng `onClick` với một hàm xử lý,
                      hoặc dùng thuộc tính `data-id` của HTML (ví dụ: `data-id={this.props.data.id}`).
                    - className="delete": Gán class CSS.
                    - href="list.html": Link cứng đến 'list.html'.
                    - type="student": Thuộc tính không chuẩn của HTML, có thể là `data-type="student"`. */}
                <td><a data={1} className="delete" href="list.html" type="student">Xóa</a></td>
            </tr>
        );
    }
}

// Xuất component Student ra để các component khác có thể import và sử dụng.
export default Student;