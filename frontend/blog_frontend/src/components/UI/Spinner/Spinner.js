import React from "react";

import cssClass from "./Spinner.css";

const spinner = props => {
    return (
        <div className={cssClass.spinner}>
            <div className={cssClass.cube1}></div>
            <div className={cssClass.cube2}></div>
        </div>
    );
};

export default spinner;
