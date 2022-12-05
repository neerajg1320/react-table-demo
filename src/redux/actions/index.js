import * as ActionTypes from '../actionTypes';

export const addRow = (rows) => {
  return {
    'type': ActionTypes.ADD_ROW,
    'payload': {
      rows
    }
  }
};

export const deleteRows = (ids) => {
  return {
    'type': ActionTypes.DELETE_ROWS,
    'payload': {
      ids
    }
  }
}

export const getRows = () => {
  return {
    'type': ActionTypes.GET_ROWS,
    'payload': {
    }
  }
}