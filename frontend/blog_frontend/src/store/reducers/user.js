import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    loading: false,
    userProfile: null,
    error: null
};

const userProfileViewInit = (state, action) => {
    return updateObject(state, {
        loading: true,
        userProfile: null,
        error: null
    });
};

const userProfileViewSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        userProfile: action.userProfile,
        error: null
    });
};

const userProfileViewFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        userProfile: null,
        error: action.error
    });
};

const userProfileEditInit = (state, action) => {
    return updateObject(state, {
        loading: true,
        userProfile: null,
        error: null
    });
};

const userProfileEditSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        userProfile: action.data,
        error: null
    });
};

const userProfileEditFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        userProfile: null,
        error: action.error
    });
};

const userPostEditInit = (state, action) => {
    return updateObject(state, {
        loading: true,
        userProfile: null,
        error: null
    });
};

const userPostEditSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        userProfile: null,
        error: null
    });
};

const userPostEditFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        userProfile: null,
        error: action.error
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_PROFILE_VIEW_INIT:
            return userProfileViewInit(state, action);
        case actionTypes.USER_PROFILE_VIEW_SUCCESS:
            return userProfileViewSuccess(state, action);
        case actionTypes.USER_PROFILE_VIEW_FAIL:
            return userProfileViewFail(state, action);
        case actionTypes.USER_PROFILE_EDIT_INIT:
            return userProfileEditInit(state, action);
        case actionTypes.USER_PROFILE_EDIT_SUCCESS:
            return userProfileEditSuccess(state, action);
        case actionTypes.USER_PROFILE_EDIT_FAIL:
            return userProfileEditFail(state, action);
        case actionTypes.USER_POST_EDIT_INIT:
            return userPostEditInit(state, action);
        case actionTypes.USER_POST_EDIT_SUCCESS:
            return userPostEditSuccess(state, action);
        case actionTypes.USER_POST_EDIT_FAIL:
            return userPostEditFail(state, action);
        default:
            return state;
    }
};

export default reducer;
