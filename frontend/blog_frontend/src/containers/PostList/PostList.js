// Post List For Homepage

import React, { Component } from "react";

import AxiosInstance from "../../AxiosInstance";
import Spinner from "../../components/UI/Spinner/Spinner";
import Posts from "../../components/Posts/Posts";
import cssClass from "./PostList.css";

class PostList extends Component {
    state = {
        posts: null,
        loading: true
    };

    componentWillMount() {
        AxiosInstance.get("posts/")
            .then(response =>
                this.setState({ posts: response.data, loading: false })
            )
            .catch(err => console.log("Error From PostList.js", err));
    }

    render() {
        let postList = <Spinner />;
        if (!this.state.loading && this.state.posts) {
            postList = <Posts postList={this.state.posts} />;
        }

        return <div className={cssClass.PostList}>{postList}</div>;
    }
}

export default PostList;
