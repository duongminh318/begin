import React, { Component } from 'react';

class Message extends Component {
    render() {
        return (
            <div className={`alert alert-${this.props.isError ? "danger" : "success"}`}>{this.props.children}</div>
        );
    }
} 

export default Message;