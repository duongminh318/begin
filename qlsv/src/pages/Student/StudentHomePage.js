import React, { Component } from 'react';
import StudentList from '../../components/Student/StudentList';
import Search from '../../components/Search';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';



const StudentHomePage = () => {
   const list= useSelector(state=> state.studentReducer.list);
    return (
        <div>
            <h1>Danh sách sinh viên</h1>
            <NavLink to="/student/create"
                className="btn btn-info">
                Add
            </NavLink>
            <Search />
            <StudentList list={list} />
        </div>
    )
}

export default StudentHomePage;