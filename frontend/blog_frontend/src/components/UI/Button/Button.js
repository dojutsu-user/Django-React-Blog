import React from "react";

import cssClass from "./Button.css";

const button = props => {
    let css = null;
    if (props.red) {
        css = cssClass.Danger;
    } else {
        css = cssClass.Button;
    }
    return (
        <button disabled={props.disabled} className={css}>
            {props.children}
        </button>
    );
};

export default button;
