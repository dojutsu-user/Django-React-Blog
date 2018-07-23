// Post List For Dashboard

import React, { Component } from "react";
import { connect } from "react-redux";

import cssClass from "./PostList.css";
import * as actions from "../../../store/actions/index";
import Spinner from "../../../components/UI/Spinner/Spinner";

class PostList extends Component {
    getPostsList = () => {
        const config = {
            headers: {
                AUTHORIZATION: "JWT " + this.props.token
            }
        };
        this.props.onListPostsToUserDashboard(config);
    };

    componentDidMount() {
        this.getPostsList();
    }

    componentWillMount() {
        this.getPostsList();
    }

    render() {
        let postsList = this.props.userPostsList
            ? this.props.userPostsList.map(post => (
                  <tr>
                      <td>{post.title}</td>
                      <td>{post.total_comments}</td>
                      <td>{new Date(post.created_on).toDateString()}</td>
                      <td>
                          {post.is_published ? (
                              <span style={{ color: "green" }}>Published</span>
                          ) : (
                              <span style={{ color: "red" }}>
                                  Not Published Yet
                              </span>
                          )}
                      </td>
                  </tr>
              ))
            : null;

        let userPostsListTable = <Spinner />;

        if (!this.props.loading && this.props.userPostsList) {
            userPostsListTable = (
                <div className={cssClass.OuterWrapper}>
                    <table className={cssClass.Table}>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Total Comments</th>
                                <th>Date Created</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>{postsList}</tbody>
                    </table>
                </div>
            );
        }

        return userPostsListTable;
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userPostsList: state.post.userPostsList,
        loading: state.post.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onListPostsToUserDashboard: config =>
            dispatch(actions.listPostsToUserDashboard(config))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostList);
