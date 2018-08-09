import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    loading: false,
    userPostsList: []
};

const sendNewPostToServerInit = (state, action) => {
    return updateObject(state, { loading: true, userPostsList: null });
};

const sendNewPostToServerSuccess = (state, action) => {
    return updateObject(state, { loading: false, userPostsList: null });
};

const sendNewPostToServerFail = (state, action) => {
    return updateObject(state, { loading: false, userPostsList: null });
};

const listPostsToUserDashboardInit = (state, action) => {
    return updateObject(state, { loading: false, userPostsList: null });
};

const listPostsToUserDashboardSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        userPostsList: action.userPosts
    });
};

const listPostsToUserDashboardFail = (state, action) => {
    return updateObject(state, { loading: false, userPostsList: null });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SEND_NEW_POST_TO_SERVER_INIT:
            return sendNewPostToServerInit(state, action);
        case actionTypes.SEND_NEW_POST_TO_SERVER_SUCCESS:
            return sendNewPostToServerSuccess(state, action);
        case actionTypes.SEND_NEW_POST_TO_SERVER_FAIL:
            return sendNewPostToServerFail(state, action);
        case actionTypes.LIST_POSTS_TO_USER_DASHBOARD_INIT:
            return listPostsToUserDashboardInit(state, action);
        case actionTypes.LIST_POSTS_TO_USER_DASHBOARD_SUCCESS:
            return listPostsToUserDashboardSuccess(state, action);
        case actionTypes.LIST_POSTS_TO_USER_DASHBOARD_FAIL:
            return listPostsToUserDashboardFail(state, action);
        default:
            return state;
    }
};

export default reducer;
