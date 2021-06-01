import * as actionTypes from '../actions/actionTypes';

const initialState = {
    info: {},
    modalActive: false,
    list: [],
    pageNumber: 1,
    selectedPost: {}
};

const reducer = ( state = initialState, action:any ) => {
    switch ( action.type ) {
        case actionTypes.UPDATE_USER_INFO:
            return {
                ...state, 
                info: action.val
            };
        case actionTypes.OPEN_MODAL:
            return {
                ...state, 
                modalActive: true
            };
        case actionTypes.CLOSE_MODAL:
            return {
                ...state, 
                modalActive: false
            };
        case actionTypes.UPDATE_LIST:
            return {
                ...state, 
                list: action.val
            };
        case actionTypes.PAGE_NUMBER:
            return {
                ...state, 
                pageNumber: state.pageNumber + 1
            };
        case actionTypes.SELECT_POST:
            return {
                ...state, 
                selectedPost: action.val
            };
    }
    return state;
};

export default reducer;