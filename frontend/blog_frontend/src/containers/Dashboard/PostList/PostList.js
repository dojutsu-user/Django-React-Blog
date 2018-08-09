// Post List For Dashboard

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

    postDeleteHandler = slug => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                AUTHORIZATION: "JWT " + this.props.token
            },
            data: {
                slug: slug
            }
        };

        let confirmation = window.confirm("Do You Want To Delete This Post?");

        if (confirmation) {
            AxiosInstance.delete("/dashboard/delete-post/", config)
                .then(response => {
                    alert("Post Deleted");
                    this.getPostsList();
                })
                .catch(error => {
                    alert("Something Went Wrong");
                    this.getPostsList();
                });
        }
    };

    render() {
        let postsList = this.props.userPostsList
            ? this.props.userPostsList.map(post => (
                  <tr key={post.slug}>
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
                      {!post.is_published ? (
                          <td>
                              <div className={cssClass.Actions}>
                                  <Link to={"/" + post.slug + "/edit"}>
                                      <Button>Edit</Button>
                                  </Link>
                              </div>
                              <Button
                                  red
                                  clicked={this.postDeleteHandler}
                                  slug={post.slug}
                              >
                                  Delete
                              </Button>
                          </td>
                      ) : (
                          <td>
                              <Button
                                  red
                                  clicked={this.postDeleteHandler}
                                  identifier={post.slug}
                              >
                                  Delete
                              </Button>
                          </td>
                      )}
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
                                <th />
                            </tr>
                        </thead>
                        <tbody>{postsList}</tbody>
                    </table>
                </div>
            );
        }

        return (
            <Aux>
                <div className={cssClass.Title}>Posts List</div>
                <div>{userPostsListTable}</div>
            </Aux>
        );
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
