import {valToString} from "../../utils/types";

export function colToRTCol (colObj) {
  const reactColObj = {
    "Header": colObj['label'],
    "accessor": colObj['key'],
    ...colObj
  }

  delete reactColObj['label'];
  delete reactColObj['key'];

  if (reactColObj.accessor.toLowerCase().includes('date')) {
    reactColObj.Cell = ({ value }) => {
      return valToString(value);
    }
  }

  return reactColObj;
}