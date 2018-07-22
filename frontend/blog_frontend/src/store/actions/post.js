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
                alert(error);
                dispatch(sendNewPostToServerFail());
            });
    };
};
