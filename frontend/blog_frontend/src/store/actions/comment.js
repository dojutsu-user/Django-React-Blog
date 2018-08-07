import * as actionTypes from "./actionTypes";

import AxiosInstance from "../../AxiosInstance";

export const createCommentInit = () => {
    return {
        type: actionTypes.CREATE_COMMENT_INIT
    };
};

export const createCommentSuccess = () => {
    return {
        type: actionTypes.CREATE_COMMENT_SUCCESS
    };
};

export const createCommentFail = error => {
    return {
        type: actionTypes.CREATE_COMMENT_FAIL,
        error: error
    };
};

export const createComment = (data, slug, refreshFunction) => {
    return dispatch => {
        dispatch(createCommentInit());
        AxiosInstance.post("/comments/create/" + slug + "/", data)
            .then(response => {
                alert("Comment Added Successfully");
                dispatch(createCommentSuccess());
                refreshFunction()
            })
            .catch(error => {
                alert("ERROR..!! Something Went Wrong");
                dispatch(createCommentFail(error));
            });
    };
};
