import React, { Component } from "react";

import Aux from "../Aux/Aux";
import Toobar from "../../components/UI/Toolbar/Toolbar";
import Sidebar from "../../components/UI/Sidebar/Sidebar";
import Logo from "../../components/UI/Logo/Logo";
import cssClass from "./Layout.css";

class Layout extends Component {
    state = {
        isSidebarOpen: false
    };

    SidebarToggleHandler = () =>
        this.setState(prevState => {
            return {
                isSidebarOpen: !prevState.isSidebarOpen
            };
        });

    render() {
        return (
            <Aux>
                <Logo />
                <Toobar clicked={this.SidebarToggleHandler} />
                <Sidebar isSidebarOpen={this.state.isSidebarOpen} />
                <main>{this.props.children}</main>
            </Aux>
        );
    }
}

export default Layout;
