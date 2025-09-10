import React, { Component } from 'react';
import Student from './Student';

class StudentList extends Component {
    constructor(props) {
        super(props);
        this.state = { studentList: [], isLoaded: false, error: null };
    }
    componentDidMount() {
        fetch('https://65d036e5ab7beba3d5e2df7e.mockapi.io/api/v1/students')
            .then(result => result.json())
            .then(result => this.setState({ studentList: result, isLoaded: true }))
            .catch(error => this.setState({ error: error, isLoaded: true }));
    }

    render() {
        const { studentList, isLoaded, error } = this.state;
        if (!isLoaded) {
            return <div className="text-success">Loading...</div>
        } else if (error) {
            return <div className="text-danger">{error}</div>
        }
        return (
            <>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Mã SV</th>
                            <th>Tên</th>
                            <th>Ngày Sinh</th>
                            <th>Giới Tính</th>
                            <th />
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {studentList.map((objectStudent, index) => {
                            return (
                                <Student key={index} data={objectStudent} order={index + 1} />
                            )
                        })}
                    </tbody>
                </table>
                <div>
                    <span>Số lượng: {studentList.length}</span>
                </div>
            </>
        );
    }
}

export default StudentList;