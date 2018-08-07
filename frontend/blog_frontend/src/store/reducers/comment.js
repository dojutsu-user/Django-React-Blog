import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    loading: false,
    error: null
};

const createCommentInit = (state, action) => {
    return updateObject(state, { loading: true, error: null });
};

const createCommentSuccess = (state, action) => {
    return updateObject(state, { loading: false, error: null });
};

const createCommentFail = (state, action) => {
    return updateObject(state, { loading: false, error: action.error });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_COMMENT_INIT:
            return createCommentInit(state, action);
        case actionTypes.CREATE_COMMENT_SUCCESS:
            return createCommentSuccess(state, action);
        case actionTypes.CREATE_COMMENT_FAIL:
            return createCommentFail(state, action);
        default:
            return state;
    }
};

export default reducer;
