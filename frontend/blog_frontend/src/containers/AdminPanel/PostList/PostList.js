import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import cssClass from "./PostList.css";
import * as actions from "../../../store/actions/index";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Button from "../../../components/UI/Button/Button";
import AxiosInstance from "../../../AxiosInstance";
import Aux from "../../../hoc/Aux/Aux";

class PostList extends Component {
    getAllPosts = () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                AUTHORIZATION: "JWT " + this.props.token
            }
        };
        this.props.onAdminViewAllPosts(config);
    };
    componentDidMount() {
        this.getAllPosts();
    }

    postDeleteHandler = slug => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                AUTHORIZATION: "JWT " + this.props.token
            }
        };

        let confirmation = window.confirm("Do You Want To Delete This Post?");

        if (confirmation) {
            AxiosInstance.delete(
                "/admin-panel/posts/view/" + slug + "/",
                config
            )
                .then(response => {
                    alert("Post Deleted");
                    this.getAllPosts();
                })
                .catch(error => {
                    alert("Something Went Wrong");
                });
        }
    };

    render() {
        let postsList = this.props.allPosts;
        if (this.props.allPosts) {
            postsList = this.props.allPosts.map(post => (
                <tr key={post.slug}>
                    <td>{post.title}</td>
                    <td>{post.total_comments}</td>
                    <td>{post.author_full_name}</td>
                    {post.is_published ? (
                        <td style={{ color: "green" }}>Published</td>
                    ) : (
                        <td style={{ color: "red" }}>Not Published</td>
                    )}
                    <td>
                        <div className={cssClass.Actions}>
                            <Link to={"/admin-panel/posts/detail/" + post.slug}>
                                <Button>Edit</Button>
                            </Link>
                        </div>
                        <Button
                            red
                            clicked={this.postDeleteHandler}
                            identifier={post.slug}
                        >
                            Delete
                        </Button>
                    </td>
                    <td>
                        <Link to={"/admin-panel/comments/list/" + post.slug}>
                            View Comments
                        </Link>
                    </td>
                </tr>
            ));
        }

        let postsListTable = <Spinner />;

        if (!this.props.loading && this.props.allPosts) {
            postsListTable = (
                <div className={cssClass.OuterWrapper}>
                    <table className={cssClass.Table}>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Total Comments</th>
                                <th>Author</th>
                                <th>Status</th>
                                <th>Actions</th>
                                <th>Comments</th>
                            </tr>
                        </thead>
                        <tbody>{postsList}</tbody>
                    </table>
                </div>
            );
        }

        return (
            <Aux>
                <div className={cssClass.Title}>All Posts</div>
                <div>{this.props.allPosts ? postsListTable : <Spinner />}</div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        loading: state.admin.loading,
        allPosts: state.admin.allPosts
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAdminViewAllPosts: config =>
            dispatch(actions.adminViewAllPosts(config))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostList);
