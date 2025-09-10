import React, { Component } from 'react';

class StudentEditPage extends Component {
    render() {
        return (
            <>
                <div>
                    <h1>Chỉnh sửa sinh viên</h1>
                    <form action="list.html" method="POST">
                        <input type="hidden" name="id" defaultValue={1} />
                        <div className="container">
                            <div className="row">
                                <div className="col-md-5">
                                    <div className="form-group">
                                        <label>Tên</label>
                                        <input type="text" className="form-control" placeholder="Tên của bạn" required name="name" defaultValue="Nguyễn Thị Bé Bảy" />
                                    </div>
                                    <div className="form-group">
                                        <label>Birthday</label>
                                        <input type="date" className="form-control" placeholder="Ngày sinh của bạn" required name="birthday" defaultValue="2000-03-09" />
                                    </div>
                                    <div className="form-group">
                                        <label>Chọn Giới tính</label>
                                        <select className="form-control" id="gender" name="gender" required>
                                            <option value={0}>Nam</option>
                                            <option value={1} selected>Nữ</option>
                                            <option value={2}>Khác</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-success" type="submit">Lưu</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

            </>
        );
    }
}

export default StudentEditPage;