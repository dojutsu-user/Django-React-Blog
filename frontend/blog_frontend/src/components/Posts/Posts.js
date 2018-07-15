import React from "react";

import Post from "./Post/Post";

const posts = props => {
    const postList = props.postList.map(post => (
        <Post
            key={post.slug}
            title={post.title}
            datePublished={post.published_on}
            totalComments={post.total_comments}
            author={post.author_full_name}
            short_description={post.short_description}
        />
    ));
    return <div>{postList}</div>;
};

export default posts;
