import React from 'react';

const ProductList = () => {
    const str = `[
        {
            "id": 1,
            "name": "Product001",
            "cost": 10,
            "quantity": 1000,
            "locationId": 1,
            "familyId": 1
        },
        {
            "id": 2,
            "name": "Product002",
            "cost": 20,
            "quantity": 2000,
            "locationId": 1,
            "familyId": 2
        }
    ]`

    const products = JSON.parse(str);
    console.log(products);


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
                    <tr>
                        <td>Test</td>
                        <td>10.00</td>
                        <td> </td>

                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ProductList;