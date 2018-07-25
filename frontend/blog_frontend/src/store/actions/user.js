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
