import React, { Component } from 'react';

// car1 là component
// component là 1 react element
class Car1 extends Component {
    render() {
        let b = 100;
        return (
            <div>
                Car được xây dựng từ class số lượng xe {b}
            </div>
        );
    }
}

export default Car1;