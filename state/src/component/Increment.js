// Dòng này "gọi" React và yêu cầu nó cung cấp 2 thứ:
// - React: Nền tảng chung của thư viện.
// - Component: "Bản thiết kế" gốc cho tất cả các class component.
import React, { Component } from 'react';

// Định nghĩa một class component tên là Increment, kế thừa từ "bản thiết kế" Component gốc.
class Increment extends Component {
    // constructor là hàm được chạy đầu tiên khi một component được tạo ra.
    // Nó dùng để khởi tạo những giá trị ban đầu, đặc biệt là state.
    constructor(props){
        // Luôn phải gọi super(props) đầu tiên trong constructor.
        // Nó đảm bảo rằng component của chúng ta được thiết lập đúng cách.
        super(props)
        // this.state là một object đặc biệt chứa tất cả dữ liệu "nội bộ" của component.
        // Ở đây, ta khởi tạo state với một thuộc tính là 'value' có giá trị ban đầu là 0.
        this.state= {value: props.value}
    }

    // Đây là một phương thức (hàm) của class, dùng để thay đổi state.
    tanglen(){
        // this.setState là phương thức DUY NHẤT được dùng để cập nhật state.
        // Nó nhận vào một object, chỉ định thuộc tính nào cần thay đổi và giá trị mới của nó.
        // React sẽ tự động render lại giao diện mỗi khi setState được gọi.
        this.setState({value: this.state.value+5})
    }

    // render() là phương thức bắt buộc trong mọi class component.
    // Nó có nhiệm vụ trả về JSX (giao diện) để hiển thị lên màn hình.
    render() {
        return (
            <div>
                {/* Dùng this.state.value để đọc và hiển thị giá trị hiện tại từ state. */}
                <span> giá trị {this.state.value}</span>
                <br/>
                {/* Thuộc tính onClick nhận vào một hàm.
                    Khi người dùng nhấn vào nút, hàm this.tanglen() sẽ được gọi.
                */}
                <button onClick={()=>this.tanglen()}> Tăng 5 đơn vị </button>
            </div>
        );
    }
}

// "Xuất khẩu" component Increment để các file khác có thể sử dụng.
export default Increment;