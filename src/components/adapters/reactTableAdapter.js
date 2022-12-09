import {valToString} from "../../utils/types";

export function colToRTCol (colObj) {
  const reactColObj = {
    "Header": colObj['label'],
    "accessor": (row) => {return row[colObj['key']]},
    ...colObj
  }

  if (String(colObj.key).toLowerCase().includes('date')) {
    reactColObj.Cell = ({ value }) => {
      return valToString(value);
    }
  }

  delete reactColObj['label'];
  delete reactColObj['key'];

  return reactColObj;
}