import React from "react";

import cssClass from "./Input.css";

const input = props => {
    switch (props.elementType) {
        case "input":
            return (
                <input
                    className={cssClass.TextField}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            );
        case "textarea":
            return (
                <textarea
                    className={cssClass.TextArea}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            );
    }
};

export default input;
