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
            .then((response) => response.json())
            .then((result) => setProductList(result))
            .catch((error) => console.error(error));

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