import React, { Component } from "react";

class Layout extends Component {
    render() {
        return <div>{this.props.children}</div>;
    }
}

export default Layout;
