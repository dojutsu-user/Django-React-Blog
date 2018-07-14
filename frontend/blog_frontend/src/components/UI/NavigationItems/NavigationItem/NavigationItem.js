import React from "react";

import cssClass from "./NavigationItem.css";

const navigationItem = props => {

    let classes = [cssClass.Item,]
    if (props.active) {
        classes.push(cssClass.active)
    }

    return <li className={classes.join(' ')}>{props.children}</li>;
};

export default navigationItem;
