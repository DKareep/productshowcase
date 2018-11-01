import * as actionTypes from '../actionCreators/actionTypes';

const initialState = {
    categories: [],
    swimLines: [],
    hasMoreCounter: 0,
    hasMore: true,
    swimLineLoading: false,
    pageLoading: false,
    err: null,
    modalImage: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SWIMLINE_DATA_LOAD_START:
            return {
                ...state,
                pageLoading: true
            };
        case actionTypes.SWIMLINE_DATA_LOAD_SUCCESS:
            return {
                ...state,
                categories: action.categories,
                hasMoreCounter: action.hasMoreCounter,
                pageLoading: false
            };
        case actionTypes.SWIMLINE_DATA_LOAD_FAIL:
            return {
                ...state,
                error: action.err,
                pageLoading: false
            };

        case actionTypes.INFINITE_SWIMLINE_DATA_LOAD_START:
            return {
                ...state,
                swimLineLoading: true
            };
        case actionTypes.INFINITE_SWIMLINE_DATA_LOAD_SUCCESS:
            return {
                ...state,
                categories: action.categories,
                hasMore: action.hasMore,
                swimLineLoading: false,
                hasMoreCounter: action.hasMoreCounter,

            };
        case actionTypes.INFINITE_SWIMLINE_DATA_LOAD_FAIL:
            return {
                ...state,
                error: action.err,
                swimLineLoading: false
            };

        case actionTypes.INFINITE_SWIMLINE_TILE_DATA_LOAD_START:
            return {
                ...state
            };
        case actionTypes.INFINITE_SWIMLINE_TILE_DATA_LOAD_SUCCESS:
            return {
                ...state,
                categories: action.categories
            };
        case actionTypes.INFINITE_SWIMLINE_TILE_DATA_LOAD_FAIL:
            return {
                ...state,
                error: action.err
            };
        case actionTypes.SET_MODAL_IMAGE:
            return {
                ...state,
                modalImage: action.img
            };
        default:
            return state;
    }
};

export default reducer;
