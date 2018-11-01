import * as actionTypes from './actionTypes';
import axios from "../../axiosInstance";

export const fetchSwimLineDataStart = () => {
    return {
        type: actionTypes.SWIMLINE_DATA_LOAD_START
    }
};
export const fetchInifiniteSwimLineDataStart = () => {
    return {
        type: actionTypes.INFINITE_SWIMLINE_DATA_LOAD_START
    }
};
export const fetchInifiniteSwimLineTileDataStart = () => {
    return {
        type: actionTypes.INFINITE_SWIMLINE_TILE_DATA_LOAD_START
    }
};

export const fetchSwimLineDataSuccess = (updatedCategories, hasMoreCounter) => {
    return {
        type: actionTypes.SWIMLINE_DATA_LOAD_SUCCESS,
        categories: updatedCategories,
        hasMoreCounter: hasMoreCounter
    }
};
export const fetchInifinteSwimLineDataSuccess = (updatedCategories, hasMoreCounter, hasMore) => {
    return {
        type: actionTypes.INFINITE_SWIMLINE_DATA_LOAD_SUCCESS,
        categories: updatedCategories,
        hasMoreCounter: hasMoreCounter,
        hasMore: hasMore
    }
};
export const fetchSwimLineTileDataSuccess = (updatedCategories) => {
    return {
        type: actionTypes.INFINITE_SWIMLINE_TILE_DATA_LOAD_SUCCESS,
        categories: updatedCategories
    }
};

export const fetchSwimLineDataFail = (err) => {
    return {
        type: actionTypes.SWIMLINE_DATA_LOAD_FAIL,
        err: err
    }
};
export const fetchInfiniteSwimLineDataFail = (err) => {
    return {
        type: actionTypes.INFINITE_SWIMLINE_DATA_LOAD_FAIL,
        err: err
    }
};

export const fetchInfiniteSwimLineTileDataFail = (err) => {
    return {
        type: actionTypes.INFINITE_SWIMLINE_TILE_DATA_LOAD_FAIL,
        err: err
    }
};

export const setModalImage = (img) => {
    return{
        type: actionTypes.SET_MODAL_IMAGE,
        img: img
    }
};

export const fetchSwimLineData = (categories, swimLineLoading, hasMoreCounter, hasMore) => {
    return dispatch => {
        if (hasMoreCounter <= 2 && categories.length === 0) {
            dispatch(fetchSwimLineDataStart());
        } else if (hasMoreCounter <= 2 && categories.length !== 0 && hasMore) {
            dispatch(fetchInifiniteSwimLineDataStart())
        } else {
            return;
        }
        // console.log(categories.length, 'category Loader called');
        axios.get('/categories')
            .then(response => {
                // console.log(response);
                let updatedCategories = [];

                if (categories.length === 0) {
                    updatedCategories = updatedCategories.concat(response.data);
                    dispatch(fetchSwimLineDataSuccess(updatedCategories, hasMoreCounter + 1))
                } else {
                    updatedCategories = categories.concat(response.data);
                    let hasMore = true;
                    if (hasMoreCounter > 2) {
                        hasMore = false;
                    }
                    dispatch(fetchInifinteSwimLineDataSuccess(updatedCategories, hasMoreCounter + 1, hasMore))
                }
            })
            .catch(e => {
                if (categories.length === 0) {
                    dispatch(fetchSwimLineDataFail(e));
                } else {
                    dispatch(fetchInfiniteSwimLineDataFail(e));
                }
                // console.log(e);
                // alert(JSON.stringify(e));
            })
    }
};
export const fetchSwimLineTilesData = (category, categoryIndex, categories) => {
    return dispatch => {
        dispatch(fetchInifiniteSwimLineTileDataStart());
        axios.get(`/categories/${category}`)
            .then(response => {
                // console.log(response);
                response = response.data[0].models.slice(0, 5);
                let category = categories[categoryIndex];
                category.models = [...category.models, ...response];
                categories[categoryIndex] = category;
                dispatch(fetchSwimLineTileDataSuccess(categories))

            })
            .catch(e => {
                dispatch(fetchInfiniteSwimLineTileDataFail(e))
                // console.log(e);
            })
        // alert(JSON.stringify(e));
    }

};

