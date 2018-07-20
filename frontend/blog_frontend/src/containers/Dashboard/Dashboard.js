import React, { Component } from "react";
import { connect } from "react-redux";

import cssClass from "./Dashboard.css";
import { Redirect } from "react-router-dom";
import Aux from "../../hoc/Aux/Aux";

class Dashboard extends Component {
    render() {
        return (
            <Aux>
                <div className={cssClass.OuterWrapper}>
                    {" "}
                    <div class={cssClass.InnerWrapper}>
                        <div className={cssClass.Container}>
                            View Your Profile
                        </div>
                        <div className={cssClass.Container}>
                            Edit Your Profile
                        </div>
                    </div>
                    <div className={cssClass.InnerWrapper}>
                        <div className={cssClass.Container}>Create A Post</div>
                        <div className={cssClass.Container}>Your Posts</div>
                    </div>
                    <div className={cssClass.InnerWrapper}>
                        <div className={cssClass.Container}>Admin Panel</div>
                    </div>
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
