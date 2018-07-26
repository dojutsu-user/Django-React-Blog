import * as actionsTypes from "./actionTypes";
import AxiosInstance from "../../AxiosInstance";

export const sendNewPostToServerInit = () => {
    return {
        type: actionsTypes.SEND_NEW_POST_TO_SERVER_INIT
    };
};

export const sendNewPostToServerSuccess = () => {
    return {
        type: actionsTypes.SEND_NEW_POST_TO_SERVER_SUCCESS
    };
};

export const sendNewPostToServerFail = () => {
    return {
        type: actionsTypes.SEND_NEW_POST_TO_SERVER_FAIL
    };
};

export const sendNewPostToServer = (postData, config) => {
    return dispatch => {
        dispatch(sendNewPostToServerInit());
        AxiosInstance.post("dashboard/create-new-post/", postData, config)
            .then(response => {
                alert("Post Submitted Successfully");
                dispatch(sendNewPostToServerSuccess());
            })
            .catch(error => {
                // alert(error.);
                console.log(error.response.data);
                dispatch(sendNewPostToServerFail());
            });
    };
};

export const listPostsToUserDashboardInit = () => {
    return {
        type: actionsTypes.LIST_POSTS_TO_USER_DASHBOARD_INIT
    };
};

export const listPostsToUserDashboardSuccess = userPosts => {
    return {
        type: actionsTypes.LIST_POSTS_TO_USER_DASHBOARD_SUCCESS,
        userPosts: userPosts
    };
};

export const listPostsToUserDashboardFail = error => {
    return {
        type: actionsTypes.LIST_POSTS_TO_USER_DASHBOARD_FAIL,
        error: error
    };
};

export const listPostsToUserDashboard = config => {
    return dispatch => {
        dispatch(listPostsToUserDashboardInit());
        AxiosInstance.get("/dashboard/post-list", config)
            .then(response => {
                dispatch(listPostsToUserDashboardSuccess(response.data));
            })
            .catch(error => {
                alert(error);
                dispatch(listPostsToUserDashboardFail());
            });
    };
};
