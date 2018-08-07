import React, { Component } from "react";

import AxiosInstance from "../../AxiosInstance";
import Spinner from "../../components/UI/Spinner/Spinner";
import cssClass from "./PostBody.css";
import HR from "../../components/UI/HR/HR";
import Aux from "../../hoc/Aux/Aux";
import Comments from "../../components/Comments/Comments";
import CommentForm from "../CreateComment/CreateComment";

class PostBody extends Component {
    state = {
        loading: true,
        postBody: null,
        comments: null
    };

    getPostBody = () => {
        AxiosInstance.get("posts/view/" + this.props.match.params.slug)
            .then(response =>
                this.setState({ loading: false, postBody: response.data })
            )
            .catch(err => console.log("Error From PostBody.js", err));
    };

    getCommentsList = () => {
        AxiosInstance.get("comments/" + this.props.match.params.slug + "/")
            .then(response => {
                this.setState({ comments: response.data });
            })
            .catch(error => {
                alert("Error Loading Comments. Try Again..!!");
            });
    };

    renderWholePage = () => {
        this.getPostBody();
        this.getCommentsList();
    };
    componentDidMount() {
        this.renderWholePage();
    }

    render() {
        let postBody = <Spinner />;
        if (!this.state.loading && this.state.postBody) {
            postBody = (
                <Aux>
                    <div className={cssClass.PostBodyDiv}>
                        <h1 className={cssClass.Title}>
                            {this.state.postBody.title}
                        </h1>
                        <p className={cssClass.PublishedDate}>
                            {new Date(
                                this.state.postBody.published_on
                            ).toDateString()}
                        </p>
                        <HR />
                        <p className={cssClass.PostBody}>
                            {this.state.postBody.body}
                        </p>
                        <HR />
                        <div className={cssClass.PostInfo}>
                            <p> - {this.state.postBody.author_full_name}</p>
                        </div>
                        <h1 className={cssClass.CommentHeading}>
                            Comments: {this.state.postBody.total_comments}
                        </h1>
                    </div>
                    <Comments commentsList={this.state.comments} />
                    <CommentForm
                        slug={this.props.match.params.slug}
                        refresh={this.renderWholePage}
                    />
                </Aux>
            );
        }

        return postBody;
    }
}

export default PostBody;
