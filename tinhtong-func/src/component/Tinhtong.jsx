


import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Tinhtong(props) {

    // khai báo các biến state
    const [soA, setsoA] = useState(props.soA);
    const [soB, setsoB] = useState(0);
    const [tong, settong] = useState(0);

    // hàm khi thay đổi input
    // const khiThayDoiA= (e)=>{
    //     setsoA(Number(e.target.value));
    //     console.log(soA);
    // }

    //  const khiThayDoiB= (e)=>{
    //     setsoB(Number(e.target.value));
    // }

    // gom 2 hàm lại làm 1 và khi thay đổi cũng cộng luôn không cần nhấn nut submit

    const khiThayDoiInput = () => {
        // lấy ra name và value từ thẻ input
        const { name, value } = event.target; // destructuring với object

        if (name === "soA") {
            setsoA(Number(value))
            console.log("số A = ", soA);
             tinhTong();
        } else {
            setsoB(Number(value))
            console.log("số B = ", soB);
            tinhTong();
        }
    }

    const tinhTong = () => {
        settong(soA + soB);
    }



    return (
        <div className='container' style={{ textAlign: 'left' }}>
            <h2>Tính tổng 2 số</h2>


            {/* Sửa ở đây: Phải gọi hàm bằng this.changeInput */}
            <Form.Label> số a:</Form.Label>
            <Form.Control
                type="number"
                placeholder="Placeholder text"
                name='soA'
                value={soA}
                onChange={khiThayDoiInput}
                className='form-control'
            />

            <br />

            {/* Sửa ở đây: Thêm onChange cho input này */}
            <Form.Label> số b:</Form.Label>
            <Form.Control
                type="number"
                name='soB'
                value={soB}
                onChange={khiThayDoiInput}
                className='form-control'
            />
            <br />

            {/* Hiển thị kết quả tổng */}
            <Form.Label> tổng :</Form.Label>
            <div className='alert alert-success'>
                {tong}
            </div>
            <br />
            {/* Sửa ở đây: Thêm sự kiện onClick để gọi hàm tính tổng */}
            <Button variant="btn btn-primary" onClick={tinhTong}>
                Tính tổng
            </Button>

        </div>
    );
}


