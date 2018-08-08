import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../Aux/Aux";
import Toobar from "../../components/UI/Toolbar/Toolbar";
import Sidebar from "../../components/UI/Sidebar/Sidebar";
import Logo from "../../components/UI/Logo/Logo";
import Backdrop from "../../components/UI/Backdrop/Backdrop";

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

    sidebarClosedHandler = () => this.setState({ isSidebarOpen: false });

    render() {
        return (
            <Aux>
                <Logo />
                <Toobar
                    clicked={this.SidebarToggleHandler}
                    isAuth={this.props.isAuth}
                />
                <Sidebar
                    isSidebarOpen={this.state.isSidebarOpen}
                    isAuth={this.props.isAuth}
                    closed={this.sidebarClosedHandler}
                />
                <Backdrop
                    isOpen={this.state.isSidebarOpen}
                    clicked={this.SidebarToggleHandler}
                />
                <main>{this.props.children}</main>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);
