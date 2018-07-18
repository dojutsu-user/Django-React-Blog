import React from "react";

import cssClass from "./Input.css"

const input = props => {
    switch (props.elementType) {
        default:
            return (
                <input
                    className={cssClass.TextField}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            );
    }
};

export default input;
