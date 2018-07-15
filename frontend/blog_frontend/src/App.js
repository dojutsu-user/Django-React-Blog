import React, { Component } from "react";

import cssClass from "./App.css";
import Layout from "./hoc/Layout/Layout";

class App extends Component {
    render() {
        return (
            <div className={cssClass.App}>
                <Layout></Layout>
            </div>
        );
    }
}

export default App;
