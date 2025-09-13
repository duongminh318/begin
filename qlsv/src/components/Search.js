import React, { Component } from 'react';
import { useDispatch } from 'react-redux';
import { useState } from "react";


const Search = () => {
    const [search, setSearch] = useState("");
    const dispath = useDispatch();
    function handleSearch() {
        console.log(search);
        dispath({ type: "search", payload: search });
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