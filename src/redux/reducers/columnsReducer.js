import {PRESET_COLUMNS} from "../../assets/PRESET_COLUMNS";
import * as ActionTypes from '../actionTypes';

const initialState = PRESET_COLUMNS;

const columnsReducer =  (state=initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_COLUMNS:
      return state;

    case ActionTypes.DELETE_COLUMNS:
      const ids = action.payload.ids;
      return {
        ...state,
        rows: state.filter(item => !ids.includes(item.id))
      }

    default:
      return state;
  }

}

export default columnsReducer;

