import React from "react";
import { Link } from "react-router-dom";

import Button from "../../UI/Button/Button";
import cssClass from "./Post.css";

const post = props => {
    const articleClass = [
        cssClass.center,
        cssClass.mw5,
        cssClass.mw6Ns,
        cssClass.br3,
        cssClass.hidden,
        cssClass.ba,
        cssClass.bBlack10,
        cssClass.mv4
    ];

    const h1Class = [
        cssClass.f4,
        cssClass.bgNearWhite,
        cssClass.br3,
        cssClass.brTop,
        cssClass.Black60,
        cssClass.mv0,
        cssClass.pv2,
        cssClass.ph3,
        cssClass.title
    ];

    const articleDivClass = [cssClass.pa3, cssClass.bt, cssClass.bBlack10];

    const articlePClass = [
        cssClass.f6,
        cssClass.f5Ns,
        cssClass.lhCopy,
        cssClass.measure
    ];

    return (
        <article className={articleClass.join(" ")}>
            <Link
                style={{ textDecoration: "none" }}
                to={"posts/view/" + props.slug}
            >
                <h1 className={h1Class.join(" ")}>{props.title}</h1>
            </Link>
            <div className={articleDivClass.join(" ")}>
                <p className={articlePClass.join(" ")}>
                    {props.short_description}
                </p>
                <Link to={"posts/view/" + props.slug}>
                    <div className={cssClass.ReadFullPost}>
                        <Button>Read Full Post</Button>
                    </div>
                </Link>
                <br />
                <div className={cssClass.PostInfo}>
                    Author: {props.author}
                    <br />
                    Published On:{" "}
                    {new Date(props.datePublished).toDateString()}
                    <br />
                    {props.totalComments}{" "}
                    {props.totalComments == 1 ? "Comment" : "Comments"}
                </div>
            </div>
        </article>
    );
};

export default post;
