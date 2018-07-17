import React from "react";

import cssClass from "./Backdrop.css";

const backdrop = props => {

    let classes = [cssClass.Backdrop];
    if (!props.isOpen) {
        classes.push(cssClass.Close);
    }

    return (
        <div className={classes.join(' ')} onClick={props.clicked}>
            {/* */}
        </div>
    );
};

export default backdrop;
