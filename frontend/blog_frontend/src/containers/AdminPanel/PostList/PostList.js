import React, { Component } from "react";
import { connect } from "react-redux";

import cssClass from "./PostList.css";
import * as actions from "../../../store/actions/index";
import Spinner from "../../../components/UI/Spinner/Spinner";

class PostList extends Component {
    componentDidMount() {
        const config = {
            headers: {
                "Content-Type": "application/json",
                AUTHORIZATION: "JWT " + this.props.token
            }
        };
        this.props.onAdminViewAllPosts(config);
    }

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
                            </tr>
                        </thead>
                        <tbody>{postsList}</tbody>
                    </table>
                </div>
            );
        }

        return <div>{this.props.allPosts ? postsListTable : <Spinner />}</div>;
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
