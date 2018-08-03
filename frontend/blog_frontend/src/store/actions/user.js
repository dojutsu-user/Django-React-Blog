import * as actionTypes from "./actionTypes";
import AxiosInstance from "../../AxiosInstance";

export const userProfileViewInit = () => {
    return {
        type: actionTypes.USER_PROFILE_VIEW_INIT
    };
};

export const userProfileViewSuccess = userProfile => {
    return {
        type: actionTypes.USER_PROFILE_VIEW_SUCCESS,
        userProfile: userProfile
    };
};

export const userProfileViewFail = error => {
    return {
        type: actionTypes.USER_PROFILE_VIEW_FAIL,
        error: error
    };
};

export const userProfileView = config => {
    return dispatch => {
        dispatch(userProfileViewInit());
        AxiosInstance.get("/dashboard/profile", config)
            .then(response => dispatch(userProfileViewSuccess(response.data)))
            .catch(error => userProfileViewFail(error));
    };
};

export const userProfileEditInit = () => {
    return {
        type: actionTypes.USER_PROFILE_EDIT_INIT
    };
};

export const userProfileEditSuccess = data => {
    return {
        type: actionTypes.USER_PROFILE_EDIT_SUCCESS,
        data: data
    };
};

export const userProfileEditFail = error => {
    return {
        type: actionTypes.USER_PROFILE_EDIT_FAIL,
        error: error
    };
};

export const userProfileEdit = (updatedProfile, config) => {
    return dispatch => {
        dispatch(userProfileEditInit());
        AxiosInstance.patch("/dashboard/profile/", updatedProfile, config)
            .then(response => {
                alert("Profile Updated Successfully");
                dispatch(userProfileEditSuccess(response.data));
            })
            .catch(error => {
                alert("Something Went Wrong... Try Again");
                dispatch(userProfileEditFail(error));
            });
    };
};

export const userPostEditInit = () => {
    return {
        type: actionTypes.USER_POST_EDIT_INIT
    };
};

export const userPostEditSuccess = () => {
    return {
        type: actionTypes.USER_POST_EDIT_SUCCESS
    };
};

export const userPostEditFail = error => {
    return {
        type: actionTypes.USER_POST_EDIT_FAIL,
        error: error
    };
};

export const userPostEdit = (updatedPost, config) => {
    return dispatch => {
        dispatch(userPostEditInit());
        AxiosInstance.post("/dashboard/update-post/", updatedPost, config)
            .then(response => {
                alert("Post Updated Successfully");
                dispatch(userPostEditSuccess());
            })
            .catch(error => {
                alert("Something Went Wrong... Try Again");
                dispatch(userPostEditFail(error));
            });
    };
};
