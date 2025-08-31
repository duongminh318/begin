import React, { Component } from 'react';

class Tinhtong extends Component {
    constructor(props) {
        super(props);
        // Khởi tạo state cho 2 số a, b và tổng
        this.state = {
            a: 0,
            b: 0,
            tong: 0
        };
    }

    // Hàm này được gọi mỗi khi người dùng nhập vào ô số a
    handleInputChangeA = (event) => {
        // Cập nhật lại state 'a' với giá trị từ ô input
        // Dùng Number() để chuyển chuỗi thành số
        this.setState({ a: Number(event.target.value) });
    }

    // Tương tự, hàm này xử lý cho ô số b
    handleInputChangeB = (event) => {
        this.setState({ b: Number(event.target.value) });
    }

    // Hàm tính tổng, được gọi khi nhấn nút
    handleCalculate = (event) => {
        // event.preventDefault() ngăn trang web bị tải lại khi submit form
        event.preventDefault();
        // Cập nhật state 'tong' bằng tổng của a và b
        this.setState({ tong: this.state.a + this.state.b });
    }

    render() {
        return (
            // Dùng onSubmit để khi nhấn nút "Tính tổng", hàm handleCalculate sẽ được gọi
            <form onSubmit={this.handleCalculate}>
                <div>
                    <label>Số A: </label>
                    {/*
                      - value={this.state.a}: "Kết nối" giá trị của ô input với state 'a'.
                      - onChange={this.handleInputChangeA}: Khi người dùng gõ, gọi hàm để cập nhật state.
                    */}
                    <input type="number" value={this.state.a} onChange={this.handleInputChangeA} />
                </div>
                <div>
                    <label>Số B: </label>
                    <input type="number" value={this.state.b} onChange={this.handleInputChangeB} />
                </div>
                {/* Nút này có type="submit", sẽ kích hoạt sự kiện onSubmit của form */}
                <button type="submit">Tính tổng</button>
                {/* Hiển thị kết quả từ state 'tong' */}
                <h2>Kết quả: {this.state.tong}</h2>
            </form>
        )
    }
}

export default Tinhtong;