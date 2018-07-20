import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import cssClass from "./App.css";
import Layout from "./hoc/Layout/Layout";
import PostList from "./containers/PostList/PostList";
import PostBody from "./containers/PostBody/PostBody";
import Login from "./containers/Login/Login";
import Dashboard from "./containers/Dashboard/Dashboard";

class App extends Component {
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

export default App;
