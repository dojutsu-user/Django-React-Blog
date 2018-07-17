import React from "react";

const input = props => {
    switch (props.elementType) {
        default:
            return (
                <input
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            );
    }
};

export default input;
