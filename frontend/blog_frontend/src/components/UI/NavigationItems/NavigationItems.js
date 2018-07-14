import React from "react";

import NavigationItem from "./NavigationItem/NavigationItem";
import cssClass from "./NavigationItems.css";
import Logo from "../Logo/Logo";
import Aux from "../../../hoc/Aux/Aux"

const navigationItems = props => {
    return (
        <Aux>
            <Logo />
        <ul className={cssClass.UnorderList}>
            <NavigationItem>Portfolio</NavigationItem>
            <NavigationItem>About Author</NavigationItem>
            <NavigationItem active={true}>Home</NavigationItem>
        </ul>
        </Aux>
    );
};

export default navigationItems;
