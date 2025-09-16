// Import thư viện React và đối tượng Component từ React.
import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';

const Message = (props) => {

    let location = useLocation();
    console.log(location);
    return (<div></div>);
    // return (
    //     // Trả về một thẻ <div> để làm khung cho thông báo.
    //     <div
    //         // Gán className động cho thẻ div dựa trên thuộc tính `isError` được truyền vào.
    //         // - `alert`: Class CSS cơ bản của Bootstrap cho một hộp thông báo.
    //         // - `alert-danger`: Nếu `this.props.isError` là `true`, thông báo sẽ có màu đỏ (lỗi).
    //         // - `alert-success`: Nếu `this.props.isError` là `false`, thông báo sẽ có màu xanh (thành công/thông thường).
    //         className={`alert alert-${props.isError ? "danger" : "success"}`}
    //     >
    //         {/* Hiển thị nội dung của thông báo.
    //                 `this.props.children` là cách truy cập nội dung được đặt giữa thẻ mở và thẻ đóng của component.
    //                 Ví dụ: <Message>Đây là nội dung</Message> thì "Đây là nội dung" sẽ là `this.props.children`. */}
    //         {props.children}
    //     </div>
    // );
}

export default Message;