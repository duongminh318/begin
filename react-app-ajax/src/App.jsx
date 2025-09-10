import React from "react";  // Import thư viện React

// Tạo class component App kế thừa từ React.Component
export default class App extends React.Component {
  constructor(props) {
    super(props);  // Gọi constructor cha để dùng this.props
    // Khởi tạo state mặc định
    this.state = {
      error: null,      // lưu lỗi nếu có
      isLoaded: false,  // trạng thái đã tải dữ liệu chưa
      items: []         // mảng dữ liệu từ API
    };
  }

  // Hàm này chạy ngay sau khi component được mount (lần đầu render xong)
  componentDidMount() {
    // Gọi API bằng fetch
    fetch("http://api.example.com/items/index.php")  // <-- link API (anh đổi thành localhost/api/items nếu dùng local)
      .then(res => res.json())  // parse dữ liệu JSON từ response
      .then(
        (result) => {
          // Nếu thành công: cập nhật state
          this.setState({
            isLoaded: true,   // đánh dấu là đã load xong
            items: result.items // gán dữ liệu từ API vào state
          });
        },
        // Nếu lỗi khi fetch hoặc JSON không hợp lệ
        (error) => {
          this.setState({
            isLoaded: true, // vẫn đánh dấu là đã load xong
            error           // lưu lỗi vào state để hiển thị
          });
        }
      )
    console.log("Đã mount");
  }

  // Hàm render (bắt buộc) -> quyết định giao diện hiển thị
  render() {
    const { error, isLoaded, items } = this.state; // lấy state ra xài

    if (error) {
      // Nếu có lỗi thì hiển thị thông báo lỗi
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      // Nếu chưa load xong thì hiển thị "Loading..."
      return <div>Loading...</div>;
    } else {
      // Nếu có dữ liệu thì render danh sách items
      return (
        <ul>
          {items.map(item => (   // lặp qua từng phần tử trong items
            <li key={item.id}>   {/* mỗi item cần có key duy nhất */}
              {item.name} {item.price}  {/* hiển thị tên + giá */}
            </li>
          ))}
        </ul>
      );
    }
  }
}
