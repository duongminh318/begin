import React, { Component } from 'react';

class Search extends Component {
    render() {
        return (
            <form action="list.html" method="GET">
                <label className="form-inline justify-content-end">Tìm kiếm: <input type="search" name="search" className="form-control" defaultValue />
                    <button className="btn btn-danger">Tìm</button>
                </label>
            </form>
        );
    }
}

export default Search;