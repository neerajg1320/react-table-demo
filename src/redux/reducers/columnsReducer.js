import {PRESET_COLUMNS} from "../../assets/PRESET_COLUMNS";
import * as ActionTypes from '../actionTypes';

const initialState = PRESET_COLUMNS;

const columnsReducer =  (state=initialState, action) => {
  let ids;

  switch (action.type) {
    case ActionTypes.DELETE_COLUMNS:
      ids = action.payload.ids;
      return state.filter(item => !ids.includes(item.id));
      
    case ActionTypes.EDIT_ROWS:
      ids = action.payload.ids;
      const values = action.payload.values;
      return state.map(item => {
        if (ids.includes(item.id)) {
          return {...item, ...values};
        }
        return {...item};
      })

    default:
      return state;
  }

}

export default columnsReducer;

