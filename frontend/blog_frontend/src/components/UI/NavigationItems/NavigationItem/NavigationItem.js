import React from "react";

import cssClass from "./NavigationItem.css";

const navigationItem = props => {
    return <li className={cssClass.Item}>{props.children}</li>;
};

export default navigationItem;
