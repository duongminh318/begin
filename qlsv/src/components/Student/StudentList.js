// Import thư viện React và đối tượng Component từ React.
import React, { Component } from 'react';
// Import component Student để sử dụng trong danh sách.
import Student from './Student';

// Định nghĩa một Class Component có tên là StudentList.
// Component này sẽ hiển thị danh sách các sinh viên.
class StudentList extends Component {
    // Constructor được gọi khi component được tạo ra.
    constructor(props) {
        super(props); // Luôn phải gọi super(props) đầu tiên trong constructor của Class Component.

        // Khởi tạo trạng thái (state) ban đầu của component.
        // - studentList: Mảng rỗng để chứa dữ liệu sinh viên sau khi tải.
        // - isLoaded: Biến boolean báo hiệu dữ liệu đã tải xong hay chưa. Ban đầu là false (chưa tải).
        // - error: Null nếu không có lỗi, sẽ chứa thông báo lỗi nếu có.
        this.state = { studentList: [], isLoaded: false, error: null };
    }

   

    // Phương thức `render()` định nghĩa những gì component này sẽ hiển thị ra trên giao diện.
    // Phương thức `render()` định nghĩa những gì component này sẽ hiển thị ra trên giao diện.
    render() {
     
        // --- KHI DỮ LIỆU ĐÃ TẢI XONG VÀ KHÔNG CÓ LỖI ---
        // Điều kiện 3: Nếu không rơi vào 2 trường hợp trên (tức là `isLoaded` là `true` VÀ `error` là `null`).
        // Đây là nhánh mặc định khi dữ liệu đã được tải thành công và không có lỗi.
        return (
            // Fragment `<></>` được dùng để nhóm nhiều phần tử mà không thêm thẻ div/span thừa vào DOM.
            <>
                <table className="table table-hover">
                    <thead>
                       
                            <tr>
                                <th>#</th>
                                <th>Mã SV</th>
                                <th>Tên</th>
                                <th>Ngày Sinh</th>
                                <th>Giới Tính</th>
                                <th></th>{/* Cột rỗng cho nút Sửa */}
                                <th></th>{/* Cột rỗng cho nút Xóa */}
                            </tr>
                        
                    </thead>
                    <tbody>
                        {/* Lặp qua mảng studentList và render mỗi item thành một component Student. */}
                        {studentList.map((objectStudent, index) => {
                            return (
                                // Mỗi component Student con sẽ nhận:
                                // - key: Phải là một giá trị DUY NHẤT để React tối ưu việc cập nhật danh sách. index là tạm ổn nhưng ID của sinh viên sẽ tốt hơn.
                                // - data: objectStudent chứa toàn bộ thông tin của sinh viên.
                                // - order: Số thứ tự hiển thị (index + 1).
                                <Student key={objectStudent.id || index} data={objectStudent} order={index + 1} />
                            )
                        })}
                    </tbody>
                </table>
                <div>
                    <span>Số lượng: {studentList.length}</span> {/* Hiển thị tổng số sinh viên. */}
                </div>
            </>
        );
    }
}

// Xuất component StudentList ra để các component khác có thể import và sử dụng.
export default StudentList;