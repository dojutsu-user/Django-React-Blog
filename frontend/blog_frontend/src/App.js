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

class App extends Component {
    componentDidMount() {
        this.props.onCheckAuthStatus();
    }

    render() {
        const routesForLoggedInUsers = (
            <Switch>
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
        isAuth: state.auth.token !== null
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
