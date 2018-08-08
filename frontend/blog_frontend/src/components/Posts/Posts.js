import React from "react";

import Post from "./Post/Post";
import cssClass from "./Posts.css";

const posts = props => {
    let postList = null
    if (props.postList.length > 0) {
        postList = props.postList.map(post => (
            <Post
                key={post.slug}
                slug={post.slug}
                title={post.title}
                datePublished={post.published_on}
                totalComments={post.total_comments}
                author={post.author_full_name}
                short_description={post.short_description}
            />
        ));
    } else {
        postList = (
            <div className={cssClass.NoPosts}>No Posts Yet</div>
        )
    }
    return <div>{postList}</div>;
};

export default posts;
