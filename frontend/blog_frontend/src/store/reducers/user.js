import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

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
        default:
            return state;
    }
};

export default reducer;
