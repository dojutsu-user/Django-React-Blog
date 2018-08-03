import React from "react";

import cssClass from "./Button.css";

const button = props => {
    let css = null;
    if (props.red) {
        css = cssClass.Danger;
    } else {
        css = cssClass.Button;
    }

    let button = (
        <button disabled={props.disabled} className={css}>
            {props.children}
        </button>
    );

    if (props.clicked && props.slug) {
        button = (
            <button
                onClick={() => props.clicked(props.slug)}
                disabled={props.disabled}
                className={css}
            >
                {props.children}
            </button>
        );
    }
    return button;
};

export default button;
