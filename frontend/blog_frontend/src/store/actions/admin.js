import * as actionsTypes from "./actionTypes";
import AxiosInstance from "../../AxiosInstance";

export const adminUserListViewInit = () => {
    return {
        type: actionsTypes.ADMIN_USER_LIST_VIEW_INIT
    };
};

export const adminUserListViewSuccess = data => {
    return {
        type: actionsTypes.ADMIN_USER_LIST_VIEW_SUCCESS,
        data: data
    };
};

export const adminUserListViewFail = error => {
    return {
        type: actionsTypes.ADMIN_USER_LIST_VIEW_FAIL,
        error: error
    };
};

export const adminUserListView = config => {
    return dispatch => {
        dispatch(adminUserListViewInit());
        AxiosInstance.get("/admin-panel/users/", config)
            .then(response => {
                dispatch(adminUserListViewSuccess(response.data));
            })
            .catch(error => {
                dispatch(adminUserListViewFail(error));
            });
    };
};

export const adminCreateUserInit = () => {
    return {
        type: actionsTypes.ADMIN_CREATE_USER_INIT
    };
};

export const adminCreateUserSuccess = data => {
    return {
        type: actionsTypes.ADMIN_CREATE_USER_SUCCESS,
        data: data
    };
};

export const adminCreateUserFail = error => {
    return {
        type: actionsTypes.ADMIN_CREATE_USER_FAIL,
        error: error
    };
};

export const adminCreateUser = (data, config) => {
    return dispatch => {
        dispatch(adminCreateUserInit());
        AxiosInstance.post("/admin-panel/users/", data, config)
            .then(response => {
                alert("User Created Successfully");
                dispatch(adminCreateUserSuccess(response.data));
            })
            .catch(error => {
                alert("ERROR..!! Something Went Wrong");
                adminCreateUserFail(error);
            });
    };
};

export const adminViewAllPostsInit = () => {
    return {
        type: actionsTypes.ADMIN_VIEW_ALL_POSTS_INIT
    };
};

export const adminViewAllPostsSuccess = postsData => {
    return {
        type: actionsTypes.ADMIN_VIEW_ALL_POSTS_SUCCESS,
        postsData: postsData
    };
};

export const adminViewAllPostsFail = error => {
    return {
        type: actionsTypes.ADMIN_VIEW_ALL_POSTS_FAIL,
        error: error
    };
};

export const adminViewAllPosts = config => {
    return dispatch => {
        dispatch(adminViewAllPostsInit());
        AxiosInstance.get("/admin-panel/posts/", config)
            .then(response => {
                dispatch(adminViewAllPostsSuccess(response.data));
            })
            .catch(error => {
                alert("ERROR..!! Something Went Wrong");
                dispatch(adminViewAllPostsFail(error));
            });
    };
};
