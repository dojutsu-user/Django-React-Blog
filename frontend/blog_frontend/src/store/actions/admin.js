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
