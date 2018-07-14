import React, { Component } from "react";

import Aux from "../Aux/Aux";
import Toobar from "../../components/UI/Toolbar/Toolbar";

class Layout extends Component {
    render() {
        return (
            <Aux>
                <Toobar />
                <p>Sidebar</p>
                <main>{this.props.children}</main>
            </Aux>
        )
    }
}

export default Layout;
