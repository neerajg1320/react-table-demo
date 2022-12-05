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

export const editRows = (ids, values) => {
  return {
    'type': ActionTypes.EDIT_ROWS,
    'payload': {
      ids,
      values
    }
  }
}


export const addColumn = (rows) => {
  return {
    'type': ActionTypes.ADD_COLUMN,
    'payload': {
      rows
    }
  }
};

export const deleteColumns = (ids) => {
  return {
    'type': ActionTypes.DELETE_COLUMNS,
    'payload': {
      ids
    }
  }
}

export const editColumns = (ids, values) => {
  return {
    'type': ActionTypes.EDIT_ROWS,
    'payload': {
      ids,
      values
    }
  }
}
