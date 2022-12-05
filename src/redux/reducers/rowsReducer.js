import MOCK_DATA from "../../assets/MOCK_SMALL.json";
import * as ActionTypes from '../actionTypes';

const initialState = MOCK_DATA;

const rowsReducer =  (state=initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_ROWS:
            return state;

        case ActionTypes.DELETE_ROWS:
            const ids = action.payload.ids;
            return {
                ...state,
                rows: state.filter(item => !ids.includes(item.id))
            }

        default:
            return state;
    }

}

export default rowsReducer;

