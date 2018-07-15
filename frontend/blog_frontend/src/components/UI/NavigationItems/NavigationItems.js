import React from "react";
import { Link } from "react-router-dom";

import NavigationItem from "./NavigationItem/NavigationItem";
import cssClass from "./NavigationItems.css";

const navigationItems = props => {
    return (
        <div className={cssClass.NavigationItems}>
            <ul className={cssClass.UnorderList}>
                <span className={cssClass.NavigationItems}>
                    <Link style={{ textDecoration: "none" }} to="/">
                        <NavigationItem active>Home</NavigationItem>
                    </Link>
                    <Link style={{ textDecoration: "none" }} to="/about-author/"><NavigationItem>About Author</NavigationItem></Link>
                    <Link style={{ textDecoration: "none" }} to="/author-portfolio/"><NavigationItem>Portfolio</NavigationItem></Link>
                </span>
            </ul>
        </div>
    );
};

export default navigationItems;
