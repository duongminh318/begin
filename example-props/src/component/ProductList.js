// ["laptop", "điện thoại", "phụ kiện"]

//  const ProductList = (props)=>{
//     return(

//         <div> 
//             <h2> sản phẩm : {props.list}</h2>
//             <h2>Danh sách sản phẩm dùng map </h2>
//         <ul>
//             {props.list.map(sanpham=>{
//                 return(
//                  <li key={sanpham}>{sanpham}</li>
//             )})}
//         </ul>
//          </div>
//     )

// }

// export default ProductList;

// cách viết theo class
// chỉ khác là thêm hàm contructor và this

import React, { Component } from 'react';

class ProductList extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (


            <div>
                <h2> sản phẩm : {this.props.list}</h2>
                <h2>Danh sách sản phẩm dùng map </h2>
                <ul>
                    {this.props.list.map(sanpham => {
                        return (
                            <li key={sanpham}>{sanpham}</li>
                        )
                    })}
                </ul>
            </div>

        );
    }
}

export default ProductList;