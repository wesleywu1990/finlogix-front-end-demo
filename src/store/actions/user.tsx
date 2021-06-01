import * as actionTypes from './actionTypes';

// 格式如下

export const updateUserInfo = ( value:any ) => {
    return {
        type: actionTypes.UPDATE_USER_INFO,
        val: value
    };
};

export const openModal = () => {
    return {
        type: actionTypes.OPEN_MODAL,
    };
};

export const closeModal = () => {
    return {
        type: actionTypes.CLOSE_MODAL,
    };
};

export const updateList = ( value:any ) => {
    return {
        type: actionTypes.UPDATE_LIST,
        val: value
    };
};

export const updatePageNumber = () => {
    return {
        type: actionTypes.PAGE_NUMBER,
    };
};

export const selectPost = ( value:any ) => {
    return {
        type: actionTypes.SELECT_POST,
        val: value
    };
};


