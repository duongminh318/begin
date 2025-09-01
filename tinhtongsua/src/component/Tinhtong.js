// import React, { Component } from 'react';

// class Tinhtong extends Component {
//     constructor(props) {
//         super(props);
//         // Khởi tạo state cho 2 số a, b và tổng
//         this.state = {
//             a: 0,
//             b: 0,
//             tong: 0
//         };
//     }

//     // Hàm này được gọi mỗi khi người dùng nhập vào ô số a
//     handleInputChangeA = (event) => {
//         // Cập nhật lại state 'a' với giá trị từ ô input
//         // Dùng Number() để chuyển chuỗi thành số
//         this.setState({ a: Number(event.target.value) });
//     }

//     // Tương tự, hàm này xử lý cho ô số b
//     handleInputChangeB = (event) => {
//         this.setState({ b: Number(event.target.value) });
//     }

//     // Hàm tính tổng, được gọi khi nhấn nút
//     handleCalculate = (event) => {
//         // event.preventDefault() ngăn trang web bị tải lại khi submit form
//         event.preventDefault();
//         // Cập nhật state 'tong' bằng tổng của a và b
//         this.setState({ tong: this.state.a + this.state.b });
//     }

//     render() {
//         return (
//             // Dùng onSubmit để khi nhấn nút "Tính tổng", hàm handleCalculate sẽ được gọi
//             <form onSubmit={this.handleCalculate}>
//                 <div>
//                     <label>Số A: </label>
//                     {/*
//                       - value={this.state.a}: "Kết nối" giá trị của ô input với state 'a'.
//                       - onChange={this.handleInputChangeA}: Khi người dùng gõ, gọi hàm để cập nhật state.
//                     */}
//                     <input type="number" value={this.state.a} onChange={this.handleInputChangeA} />
//                 </div>
//                 <div>
//                     <label>Số B: </label>
//                     <input type="number" value={this.state.b} onChange={this.handleInputChangeB} />
//                 </div>
//                 {/* Nút này có type="submit", sẽ kích hoạt sự kiện onSubmit của form */}
//                 <button type="submit">Tính tổng</button>
//                 {/* Hiển thị kết quả từ state 'tong' */}
//                 <h2>Kết quả: {this.state.tong}</h2>
//             </form>
//         )
//     }
// }

// export default Tinhtong;


import React, { Component } from 'react';

class Tinhtong extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Khởi tạo state, có thể để trống hoặc là số 0
            soA: 0,
            soB: 0,
            tong: 0,
        }
    }

    // Một hàm duy nhất để xử lý cả 2 ô input
    changeInput = (event) => {
        this.setState({
            // Dùng [event.target.name] để cập nhật đúng state (soA hoặc soB)
            // Dùng Number() để đảm bảo giá trị lưu vào state là kiểu SỐ
            [event.target.name]: Number(event.target.value)

        })
        // 2. Sau đó mới log ra để kiểm tra
        // (Lưu ý: State cập nhật bất đồng bộ, nên log ở đây có thể chưa thấy giá trị mới nhất ngay)
        console.log("Tên input đang thay đổi:", event.target.name);
        console.log("Giá trị mới:", event.target.value);
    }

    // Hàm xử lý khi nhấn nút tính tổng
    handleTinhTong = () => {
        // Cập nhật state 'tong' bằng tổng của soA và soB
        this.setState({
            tong: this.state.soA + this.state.soB
        });
    }

    render() {  // khi goi hàm có liên quan đề setState, change thì ham render sẽ được gọi lại
        // Dom ảo --> so sánh với DOM ảo trước đó (một bản sao của DOM thật). nếu 2 cái có sự khác biệt nó mới render lại phần tử khác đó
        return (
            <div className='container text-left'>
                <h2>Tính tổng 2 số</h2>


                {/* Sửa ở đây: Phải gọi hàm bằng this.changeInput */}
                số a: <input
                    type="number"
                    name='soA'
                    value={this.state.soA}
                    onChange={(e) => this.changeInput(e)}
                    className='form-control'
                />
                <br />

                {/* Sửa ở đây: Thêm onChange cho input này */}
                số b: <input
                    type="number"
                    name='soB'
                    value={this.state.soB}
                    onChange={this.changeInput}
                    className='form-control'
                /> <br />

                {/* Hiển thị kết quả tổng */}
                tổng : <div className='alert alert-success'>
                    {this.state.tong}
                </div>
                <br />
                {/* Sửa ở đây: Thêm sự kiện onClick để gọi hàm tính tổng */}
                <button
                    type="button"
                    onClick={this.handleTinhTong}
                    className='btn bt-primary'

                >
                    Tính tổng
                </button>
            </div>
        );
    }
}

export default Tinhtong;