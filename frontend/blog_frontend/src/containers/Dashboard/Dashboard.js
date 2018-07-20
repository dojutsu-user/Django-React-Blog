import React, { Component } from "react";
import { connect } from "react-redux";

import cssClass from "./Dashboard.css";
import { Redirect } from "react-router-dom";
import Aux from "../../hoc/Aux/Aux";

class Dashboard extends Component {
    render() {
        return (
            <Aux>
                {/* {!this.props.isAuth ? <Redirect to="/" /> : null} */}
                <div className={cssClass.Dashboard}>
                    <h1>Hello World</h1>
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.token !== null
    };
};

export default connect(mapStateToProps)(Dashboard);
