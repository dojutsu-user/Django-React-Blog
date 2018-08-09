import React from "react";
import { NavLink } from "react-router-dom";

import NavigationItem from "./NavigationItem/NavigationItem";
import cssClass from "./NavigationItems.css";

const navigationItems = props => {
    return (
        <div className={cssClass.NavigationItems}>
            <ul className={cssClass.UnorderList}>
                <span className={cssClass.NavigationItems}>
                    <NavLink style={{ textDecoration: "none" }} to="/">
                        <NavigationItem>Home</NavigationItem>
                    </NavLink>
                    <a
                        style={{ textDecoration: "none" }}
                        href="https://github.com/dojutsu-user"
                    >
                        <NavigationItem>About Author</NavigationItem>
                    </a>
                    {props.isAuth ? (
                        <NavLink
                            style={{ textDecoration: "none" }}
                            to="/dashboard"
                        >
                            <NavigationItem>Dashboard</NavigationItem>
                        </NavLink>
                    ) : (
                        <NavLink
                            style={{ textDecoration: "none" }}
                            to="/login/"
                        >
                            <NavigationItem>Login</NavigationItem>
                        </NavLink>
                    )}
                </span>
            </ul>
        </div>
    );
};

export default navigationItems;
