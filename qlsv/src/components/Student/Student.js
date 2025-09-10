import React, { Component } from 'react';

class Student extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.order}</td>
                <td>{this.props.data.id}</td>
                <td>{this.props.data.name}</td>
                <td>{this.props.data.birthday}</td>
                <td>{this.props.data.gender}</td>
                <td><a href="edit.html">Sửa</a></td>
                <td><a data={1} className="delete" href="list.html" type="student">Xóa</a></td>
            </tr>
        );
    }
}

export default Student;