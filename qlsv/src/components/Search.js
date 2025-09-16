import React, { Component } from 'react';
import { useDispatch } from 'react-redux';
import { useState } from "react";


const Search = () => {
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    function handleSearch() {
        // Thực hiện cuộc gọi API để lấy danh sách sinh viên.
        fetch(`https://65d036e5ab7beba3d5e2df7e.mockapi.io/api/v1/students?name=${search}`)
            // Khi nhận được phản hồi từ server, chuyển đổi nó sang định dạng JSON.
            .then(result => result.json())
            // Khi dữ liệu JSON đã sẵn sàng...
            .then((result) => {
                // ...cập nhật state: gán dữ liệu vào studentList và đặt isLoaded thành true.
                // Việc gọi setState sẽ khiến component re-render (vẽ lại).

                dispatch({
                    type: "search",
                    payload: { keyword: search, list: result }
                });
            })


            // Nếu có lỗi trong quá trình fetch hoặc xử lý JSON...
            .catch(error => {

            });


    }
    return (
        <form action="list.html" method="GET">
            <label className="form-inline justify-content-end">
                Tìm kiếm:
                <input type="search"
                    name="search"
                    className="form-control"
                    onChange={(e) => { setSearch(e.target.value) }}
                />
                <button className="btn btn-danger"
                    onClick={(event) => handleSearch()}
                    type='button'
                >
                    Tìm
                </button>
            </label>
        </form>
    )
}

export default Search;