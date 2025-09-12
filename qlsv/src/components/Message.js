// Import thư viện React và đối tượng Component từ React.
import React, { Component } from 'react';

// Định nghĩa một Class Component có tên là Message.
// Component này dùng để hiển thị một hộp thông báo.
class Message extends Component {
    // Phương thức `render()` là bắt buộc trong mọi Class Component.
    // Nó định nghĩa những gì component này sẽ hiển thị ra trên giao diện.
    render() {
        return (
            // Trả về một thẻ <div> để làm khung cho thông báo.
            <div
                // Gán className động cho thẻ div dựa trên thuộc tính `isError` được truyền vào.
                // - `alert`: Class CSS cơ bản của Bootstrap cho một hộp thông báo.
                // - `alert-danger`: Nếu `this.props.isError` là `true`, thông báo sẽ có màu đỏ (lỗi).
                // - `alert-success`: Nếu `this.props.isError` là `false`, thông báo sẽ có màu xanh (thành công/thông thường).
                className={`alert alert-${this.props.isError ? "danger" : "success"}`}
            >
                {/* Hiển thị nội dung của thông báo.
                    `this.props.children` là cách truy cập nội dung được đặt giữa thẻ mở và thẻ đóng của component.
                    Ví dụ: <Message>Đây là nội dung</Message> thì "Đây là nội dung" sẽ là `this.props.children`. */}
                {this.props.children}
            </div>
        );
    }
}

// Xuất component Message ra để các component khác có thể import và sử dụng.
export default Message;