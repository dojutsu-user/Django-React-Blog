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

class App extends Component {
    componentDidMount() {
        this.props.onCheckAuthStatus();
    }
    render() {
        return (
            <div className={cssClass.App}>
                <Layout>
                    <Switch>
                        <Route path="/dashboard" component={Dashboard} />
                        <Route path="/login" component={Login} />
                        <Route path="/posts/view/:slug/" component={PostBody} />
                        <Route path="/" component={PostList} />
                    </Switch>
                </Layout>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCheckAuthStatus: () => dispatch(actions.authLoginCheckState())
    };
};

export default withRouter(
    connect(
        null,
        mapDispatchToProps
    )(App)
);
