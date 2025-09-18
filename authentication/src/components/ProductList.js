import React, { useEffect, useState } from 'react';

const ProductList = () => {
    const [productList, setProductList] = useState([]);
    useEffect(() => {
        // const myHeaders = new Headers();
        const token = localStorage.getItem("access_token");

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("http://localhost:8000/products", requestOptions)
            // Gửi request đến API "http://localhost:8000/products"
            // requestOptions chứa method (GET/POST/PUT...), headers, body...

            .then((response) => {
                console.log(response);
                // In ra object response để debug (status, headers, ...)

                if (response.ok) {
                    // Nếu status code từ 200–299 (thành công)
                    return response.json(); // Parse dữ liệu JSON trả về
                }

                // Nếu request trả về lỗi "Unauthorized"
                if (response.status === 401) {
                    // Xóa token + email trong localStorage (user không còn hợp lệ)
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("email");

                    // Redirect user về trang chủ để login lại
                    window.location.href = "/";
                }

                // Nếu không phải 200-299 và cũng không phải 401 => ném ra error
                throw new Error(response.status);
            })

            .then((result) => setProductList(result))
            // Nếu lấy dữ liệu thành công => lưu vào state productList

            .catch((error) => console.error(error));
        // Bắt lỗi (network lỗi, API down, hoặc throw Error phía trên)


    }, [])
    console.log(productList);


    return (
        <div>
            <h1>Product List</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>name</th>
                        <th>cost</th>
                        <th>quantity</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        productList.map((product, index) => {
                            return (
                                <tr key={index}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.cost}</td>
                                    <td>{product.quantity}</td>


                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}

export default ProductList;