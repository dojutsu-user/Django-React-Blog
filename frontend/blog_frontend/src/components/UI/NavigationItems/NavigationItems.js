import React from "react";

import NavigationItem from "./NavigationItem/NavigationItem";
import cssClass from "./NavigationItems.css";

const navigationItems = props => {
    return (
        <ul className={cssClass.UnorderList}>
            <NavigationItem>Portfolio</NavigationItem>
            <NavigationItem>About Author</NavigationItem>
            <NavigationItem>Home</NavigationItem>
        </ul>
    );
};

export default navigationItems;
