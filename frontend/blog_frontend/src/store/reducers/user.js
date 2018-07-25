import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    loading: false,
    userProfile: null,
    error: null
};

const userProfileViewInit = (state, actino) => {
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

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_PROFILE_VIEW_INIT:
            return userProfileViewInit(state, action);
        case actionTypes.USER_PROFILE_VIEW_SUCCESS:
            return userProfileViewSuccess(state, action);
        case actionTypes.USER_PROFILE_VIEW_FAIL:
            return userProfileViewFail(state, action);
        default:
            return state;
    }
};

export default reducer;
