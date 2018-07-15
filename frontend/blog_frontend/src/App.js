import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import cssClass from "./App.css";
import Layout from "./hoc/Layout/Layout";
import PostList from "./containers/PostList/PostList";
import PostBody from "./containers/PostBody/PostBody";

class App extends Component {
    render() {
        return (
            <div className={cssClass.App}>
                <Layout>
                    <Switch>
                        <Route path="/posts/view/:slug/" component={PostBody} />
                        <Route path="/" component={PostList} />
                    </Switch>
                </Layout>
            </div>
        );
    }
}

export default App;
