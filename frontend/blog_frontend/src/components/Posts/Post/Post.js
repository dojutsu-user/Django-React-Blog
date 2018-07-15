import React from "react";

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
            <h1 className={h1Class.join(" ")}>{props.title}</h1>
            <div className={articleDivClass.join(" ")}>
                <p className={articlePClass.join(" ")}>
                    {props.shortDescription}
                    </p>
                    <button className={cssClass.ReadFullPost}>
                        Read Full Post
                    </button>
                    <br />
                    <div className={cssClass.PostInfo}>
                        Author: {props.author}
                        <br />
                        Published On:{" "}
                        {new Date("2018-07-14T13:41:49+05:30").toDateString()}
                        <br />
                        {props.totalComments}{" "}
                        {props.totalComments == 1 ? "Comment" : "Comments"}
                    </div>
            </div>
        </article>
    );
};

export default post;
