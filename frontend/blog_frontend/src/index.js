import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import AuthReducer from "./store/reducers/auth";
import PostReducer from "./store/reducers/post";
import UserReducer from "./store/reducers/user";
import AdminReducer from "./store/reducers/admin";
import CommentReducer from "./store/reducers/comment";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootStore = combineReducers({
    auth: AuthReducer,
    post: PostReducer,
    user: UserReducer,
    admin: AdminReducer,
    comment: CommentReducer
});

const store = createStore(rootStore, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);
registerServiceWorker();
