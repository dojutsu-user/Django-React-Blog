import React from "react";

import NavigationItem from "./NavigationItem/NavigationItem";
import cssClass from "./NavigationItems.css";

const navigationItems = props => {
    return (
        <div className={cssClass.NavigationItems}>
            <ul className={cssClass.UnorderList}>
                <span className={cssClass.NavigationItems}>
                    <NavigationItem active>Home</NavigationItem>
                    <NavigationItem>About Author</NavigationItem>
                    <NavigationItem>Portfolio</NavigationItem>
                </span>
            </ul>
        </div>
    );
};

export default navigationItems;
