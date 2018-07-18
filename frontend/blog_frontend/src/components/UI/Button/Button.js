import React from "react";

import cssClass from "./Button.css";

const button = props => {
    return <button className={cssClass.Button}>{props.children}</button>;
};

export default button;
