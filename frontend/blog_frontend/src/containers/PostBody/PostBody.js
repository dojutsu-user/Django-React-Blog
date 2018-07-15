import React, { Component } from "react";

import AxiosInstance from "../../AxiosInstance";
import Spinner from "../../components/UI/Spinner/Spinner";

class PostBody extends Component {
    state = {
        loading: true,
        postBody: null
    };

    componentDidMount() {
        AxiosInstance.get("posts/" + this.props.postSlug)
            .then(response =>
                this.setState({ loading: false, postBody: response.data })
            )
            .catch(err => console.log("Error From PostBody.js", err));
    }

    render() {
        let postBody = <Spinner />;
        if (!this.state.loading && this.state.postBody) {
            postBody = (
                <div>
                    <h1>{post.title}</h1>
                    <p>{post.body}</p>
                    <p>{post.author_full_name}</p>
                    <p>{new Date(post.published_on).toDateString()}</p>
                </div>
            );
        }

        return postBody;
    }
}

export default PostBody;
