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

    // componentDidMount là một lifecycle method (phương thức vòng đời).
    // Nó được gọi NGAY SAU KHI component này được render (vẽ) lần đầu tiên vào DOM.
    // Đây là nơi lý tưởng để thực hiện các side effect như gọi API để lấy dữ liệu.
    componentDidMount() {
        // Thực hiện cuộc gọi API để lấy danh sách sinh viên.
        fetch('https://65d036e5ab7beba3d5e2df7e.mockapi.io/api/v1/students')
            // Khi nhận được phản hồi từ server, chuyển đổi nó sang định dạng JSON.
            .then(result => result.json())
            // Khi dữ liệu JSON đã sẵn sàng...
            .then(result =>
                // ...cập nhật state: gán dữ liệu vào studentList và đặt isLoaded thành true.
                // Việc gọi setState sẽ khiến component re-render (vẽ lại).
                this.setState({ studentList: result, isLoaded: true })
            )
            // Nếu có lỗi trong quá trình fetch hoặc xử lý JSON...
            .catch(error =>
                // ...cập nhật state: lưu lỗi và đặt isLoaded thành true (vì quá trình đã kết thúc, dù có lỗi).
                this.setState({ error: error, isLoaded: true })
            );
    }

    // Phương thức `render()` định nghĩa những gì component này sẽ hiển thị ra trên giao diện.
    // Phương thức `render()` định nghĩa những gì component này sẽ hiển thị ra trên giao diện.
    render() {
        // Giải cấu trúc (destructuring) các giá trị từ state để dễ sử dụng hơn.
        // Đây là cách ngắn gọn để lấy các thuộc tính `studentList`, `isLoaded`, `error` từ `this.state`.
        const { studentList, isLoaded, error } = this.state;

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