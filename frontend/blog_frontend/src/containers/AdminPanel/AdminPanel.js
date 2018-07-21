import React, { Component } from "react";

import Aux from "../../hoc/Aux/Aux";
import cssClass from "./AdminPanel.css";

class AdminPanel extends Component {
    render() {
        return (
            <Aux>
                <div className={cssClass.Title}>
                    <p>Admin Panel</p>
                </div>
                <div className={cssClass.OuterWrapper}>
                    {" "}
                    <div className={cssClass.InnerWrapper}>
                        <div className={cssClass.Container}>View All Users</div>
                        <div className={cssClass.Container}>
                            Create A New User
                        </div>
                    </div>
                    <div className={cssClass.InnerWrapper}>
                        <div className={cssClass.Container}>View Posts</div>
                        <div className={cssClass.Container}>
                            Create A New Post
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default adminPanel;
