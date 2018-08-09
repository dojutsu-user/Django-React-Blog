import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    loading: false,
    error: null,
    allComments: null
};

const createCommentInit = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null,
        allComments: null
    });
};

const createCommentSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        allComments: null
    });
};

const createCommentFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error,
        allComments: null
    });
};

const adminCommentListLoadInit = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null,
        allComments: null
    });
};

const adminCommentListLoadSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        allComments: action.allComments
    });
};

const adminCommentListLoadFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error,
        allComments: null
    });
};

const adminCommentEditInit = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null,
        allComments: null
    });
};

const adminCommentEditSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        allComments: null
    });
};

const adminCommentEditFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error,
        allComments: null
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_COMMENT_INIT:
            return createCommentInit(state, action);
        case actionTypes.CREATE_COMMENT_SUCCESS:
            return createCommentSuccess(state, action);
        case actionTypes.CREATE_COMMENT_FAIL:
            return createCommentFail(state, action);
        case actionTypes.ADMIN_COMMENT_LIST_LOAD_INIT:
            return adminCommentListLoadInit(state, action);
        case actionTypes.ADMIN_COMMENT_LIST_LOAD_SUCCESS:
            return adminCommentListLoadSuccess(state, action);
        case actionTypes.ADMIN_COMMENT_LIST_LOAD_FAIL:
            return adminCommentListLoadFail(state, action);
        case actionTypes.ADMIN_COMMENT_EDIT_INIT:
            return adminCommentEditInit(state, action);
        case actionTypes.ADMIN_COMMENT_EDIT_SUCCESS:
            return adminCommentEditSuccess(state, action);
        case actionTypes.ADMIN_COMMENT_EDIT_FAIL:
            return adminCommentEditFail(state, action);
        default:
            return state;
    }
};

export default reducer;
