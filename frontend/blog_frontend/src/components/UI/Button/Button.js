import React from "react";

import cssClass from "./Button.css";

const button = props => {
    return (
        <button disabled={props.disabled} className={cssClass.Button}>
            {props.children}
        </button>
    );
};

export default button;
