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

    const productlist = JSON.parse(str);
    console.log(productlist);


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
                        productlist.map((product, index) => {
                            return (
                                <tr key= {index}>
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