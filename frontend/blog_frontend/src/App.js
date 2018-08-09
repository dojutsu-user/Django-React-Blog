import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import cssClass from "./App.css";
import Layout from "./hoc/Layout/Layout";
import PostList from "./containers/PostList/PostList";
import PostBody from "./containers/PostBody/PostBody";
import Login from "./containers/Login/Login";
import Dashboard from "./containers/Dashboard/Dashboard";
import * as actions from "./store/actions/index";
import AdminPanel from "./containers/AdminPanel/AdminPanel";
import CreatePost from "./containers/CreatePost/CreatePost";
import PostListDashboard from "./containers/Dashboard/PostList/PostList";
import UserProfileView from "./containers/Dashboard/UserProfileView/UserProfileView";
import UserProfileEdit from "./containers/Dashboard/UserProfileEdit/UserProfileEdit";
import AdminUserList from "./containers/AdminPanel/UserList/UserList";
import AdminCreateUser from "./containers/AdminPanel/CreateUser/CreateUser";
import AdminViewAllPosts from "./containers/AdminPanel/PostList/PostList";
import PostEdit from "./containers/Dashboard/PostEdit/PostEdit";
import AdminEditUser from "./containers/AdminPanel/EditUser/EditUser";
import AdminEditPost from "./containers/AdminPanel/EditPost/EditPost";
import AdminPostCommentsList from "./containers/AdminPanel/PostCommentsList/PostCommentsList";
import AdminAllCommentsList from "./containers/AdminPanel/AllCommentsList/AllCommentsList";
import AdminCommentEdit from "./containers/AdminPanel/CommentEdit/CommentEdit";
import UserRegistration from "./containers/UserRegistartion/UserRegistration";

class App extends Component {
    componentDidMount() {
        this.props.onCheckAuthStatus();
    }

    render() {
        const routesForLoggedInUsers = (
            <Switch>
                <Route
                    path="/admin-panel/comments/edit/:pk"
                    component={AdminCommentEdit}
                />
                <Route
                    path="/admin-panel/comments/list/all"
                    component={AdminAllCommentsList}
                />
                <Route
                    path="/admin-panel/comments/list/:slug"
                    component={AdminPostCommentsList}
                />
                <Route
                    path="/admin-panel/posts/detail/:slug"
                    component={AdminEditPost}
                />
                <Route
                    path="/admin-panel/users/detail/:pk"
                    component={AdminEditUser}
                />
                <Route path="/:slug/edit" component={PostEdit} />
                <Route
                    path="/admin-panel/all-posts"
                    component={AdminViewAllPosts}
                />
                <Route
                    path="/admin-panel/create-user"
                    component={AdminCreateUser}
                />
                <Route
                    path="/admin-panel/user-list"
                    component={AdminUserList}
                />
                {this.props.isUserProfile ? (
                    <Route
                        path="/dashboard/profile/edit"
                        component={UserProfileEdit}
                    />
                ) : null}
                <Route path="/dashboard/profile" component={UserProfileView} />
                <Route
                    path="/dashboard/post-list"
                    component={PostListDashboard}
                />
                <Route
                    path="/dashboard/create-new-post"
                    component={CreatePost}
                />
                <Route path="/admin-panel" component={AdminPanel} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/posts/view/:slug/" component={PostBody} />
                <Route path="/" component={PostList} />
            </Switch>
        );

        const routesForAnonymousUsers = (
            <Switch>
                <Route path="/register" component={UserRegistration} />
                <Route path="/login" component={Login} />
                <Route path="/posts/view/:slug/" component={PostBody} />
                <Route path="/" component={PostList} />
            </Switch>
        );
        return (
            <div className={cssClass.App}>
                <Layout>
                    {this.props.isAuth
                        ? routesForLoggedInUsers
                        : routesForAnonymousUsers}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null,
        isUserProfile: state.user.userProfile !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCheckAuthStatus: () => dispatch(actions.authLoginCheckState())
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(App)
);
