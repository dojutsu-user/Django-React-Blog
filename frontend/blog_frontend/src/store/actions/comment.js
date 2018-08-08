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
                refreshFunction();
            })
            .catch(error => {
                alert("ERROR..!! Something Went Wrong");
                dispatch(createCommentFail(error));
            });
    };
};

export const adminCommentListLoadInit = () => {
    return {
        type: actionTypes.ADMIN_COMMENT_LIST_LOAD_INIT
    };
};

export const adminCommentListLoadSuccess = allComments => {
    return {
        type: actionTypes.ADMIN_COMMENT_LIST_LOAD_SUCCESS,
        allComments: allComments
    };
};

export const adminCommentListLoadFail = error => {
    return {
        type: actionTypes.ADMIN_COMMENT_LIST_LOAD_FAIL,
        error: error
    };
};

export const adminCommentListLoad = (config, slug = null, specific = false) => {
    return dispatch => {
        dispatch(adminCommentListLoadInit());
        let getUrl = "/admin-panel/comments/list/all/";
        if (specific) {
            getUrl = "/admin-panel/comments/list/" + slug + "/";
        }
        AxiosInstance.get(getUrl, config)
            .then(response => {
                dispatch(adminCommentListLoadSuccess(response.data));
            })
            .catch(error => {
                dispatch(adminCommentListLoadFail(error));
            });
    };
};

export const adminCommentEditInit = () => {
    return {
        type: actionTypes.ADMIN_COMMENT_EDIT_INIT
    };
};

export const adminCommentEditSuccess = () => {
    return {
        type: actionTypes.ADMIN_COMMENT_EDIT_SUCCESS
    };
};

export const adminCommentEditFail = error => {
    return {
        type: actionTypes.ADMIN_COMMENT_EDIT_FAIL,
        error: error
    };
};

export const adminCommentEdit = (config, pk) => {
    return dispatch => {
        dispatch(adminCommentEditInit());
        AxiosInstance.patch(
            "/admin-panel/comments/detail/" + pk + "/",
            null,
            config
        )
            .then(response => {
                dispatch(adminCommentEditSuccess());
                alert("Comment Edited Successfully");
            })
            .catch(error => {
                dispatch(adminCommentEditFail(error));
                alert("ERROR...!! Something Went Wrong");
            });
    };
};
