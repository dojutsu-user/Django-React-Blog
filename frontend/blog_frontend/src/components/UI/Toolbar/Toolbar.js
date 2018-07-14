import React from "react";

import NavigationItems from "../NavigationItems/NavigationItems";
import cssClass from "./Toolbar.css"

const toolbar = props => {
    return (
        <div className={cssClass.Toolbar}>
            <NavigationItems />
        </div>
    )
};

export default toolbar;
