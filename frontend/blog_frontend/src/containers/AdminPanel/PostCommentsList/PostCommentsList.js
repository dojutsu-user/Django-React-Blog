import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import cssClass from "./PostCommentsList.css";
import * as actions from "../../../store/actions/index";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Button from "../../../components/UI/Button/Button";
import AxiosInstance from "../../../AxiosInstance";
import Aux from "../../../hoc/Aux/Aux";

class PostCommentsList extends Component {
    getAllComments = () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                AUTHORIZATION: "JWT " + this.props.token
            }
        };
        this.props.onAdminCommentListLoad(
            config,
            this.props.match.params.slug,
            true
        );
    };
    componentDidMount() {
        this.getAllComments();
    }

    commentDeleteHandler = pk => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                AUTHORIZATION: "JWT " + this.props.token
            }
        };

        let confirmation = window.confirm(
            "Do You Want To Delete This Comment?"
        );

        if (confirmation) {
            AxiosInstance.delete(
                "/admin-panel/comments/detail/" + pk + "/",
                config
            )
                .then(response => {
                    alert("Comment Deleted");
                    this.getAllComments();
                })
                .catch(error => {
                    alert("Something Went Wrong");
                });
        }
    };

    render() {
        let commentsList = this.props.allComments;
        if (this.props.allComments) {
            commentsList = this.props.allComments.map(comment => (
                <tr key={comment.id}>
                    <td>{comment.name}</td>
                    <td>{comment.email}</td>
                    <td>{comment.post_title}</td>
                    <td>{new Date(comment.published_on).toDateString()}</td>
                    {comment.is_displayed ? (
                        <td style={{ color: "green" }}>Active</td>
                    ) : (
                        <td style={{ color: "red" }}>Not Active</td>
                    )}
                    <td>
                        <div className={cssClass.Actions}>
                            <Link
                                to={
                                    "/admin-panel/comments/edit/" +
                                    comment.id +
                                    "/"
                                }
                            >
                                <Button>Edit</Button>
                            </Link>
                        </div>
                        <Button
                            red
                            clicked={this.commentDeleteHandler}
                            identifier={comment.id}
                        >
                            Delete
                        </Button>
                    </td>
                </tr>
            ));
        }

        let commentsListTable = <Spinner />;

        if (!this.props.loading && this.props.allComments) {
            commentsListTable = (
                <div className={cssClass.OuterWrapper}>
                    <table className={cssClass.Table}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Post Title</th>
                                <th>Published On</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>{commentsList}</tbody>
                    </table>
                </div>
            );
        }

        return (
            <Aux>
                <div>
                    <div className={cssClass.Title}>Comments List</div>
                    {this.props.allComments ? commentsListTable : <Spinner />}
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        loading: state.comment.loading,
        allComments: state.comment.allComments
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAdminCommentListLoad: (config, slug, specific) =>
            dispatch(actions.adminCommentListLoad(config, slug, specific))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostCommentsList);
