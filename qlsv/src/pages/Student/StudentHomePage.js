import React, { Component } from 'react';
import StudentList from '../../components/Student/StudentList';
import Search from '../../components/Search';
import { NavLink } from 'react-router-dom';

class StudentHomePage extends Component {
    render() {
        return (
            <>
                <h1>Danh sách sinh viên</h1>
                <NavLink to="/student/create" className="btn btn-info">Add</NavLink>
                <Search />
                <StudentList />
            </>
        );
    }
}

export default StudentHomePage;