import React, { Component } from "react";

import AxiosInstance from "../../AxiosInstance";
import Spinner from "../../components/UI/Spinner/Spinner";
import cssClass from "./PostBody.css";

class PostBody extends Component {
    state = {
        loading: true,
        postBody: null
    };

    componentDidMount() {
        AxiosInstance.get("posts/view/" + this.props.match.params.slug)
            .then(response =>
                this.setState({ loading: false, postBody: response.data })
            )
            .catch(err => console.log("Error From PostBody.js", err));
    }

    render() {
        let postBody = <Spinner />;
        if (!this.state.loading && this.state.postBody) {
            postBody = (
                <div className={cssClass.PostBody} >
                    <h1>{this.state.postBody.title}</h1>
                    <p>{this.state.postBody.body}</p>
                    <p>{this.state.postBody.author_full_name}</p>
                    <p>{new Date(this.state.postBody.published_on).toDateString()}</p>
                </div>
            );
        }

        return postBody;
    }
}

export default PostBody;
