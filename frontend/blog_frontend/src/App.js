import React, { Component } from "react";

import cssClass from "./App.css";
import Layout from "./hoc/Layout/Layout";
import PostList from "./containers/PostList/PostList";

class App extends Component {
    render() {
        return (
            <div className={cssClass.App}>
                <Layout><PostList /></Layout>
            </div>
        );
    }
}

export default App;
