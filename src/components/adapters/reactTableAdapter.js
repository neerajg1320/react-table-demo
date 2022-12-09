import {valToString} from "../../utils/types";

export function convertToReactCol (colObj) {
  const reactColObj = {
    "Header": colObj['label'],
    "accessor": colObj['key'],
    ...colObj
  }

  delete reactColObj['label'];
  delete reactColObj['key'];

  if (colObj.label.toLowerCase().includes('date')) {
    reactColObj.Cell = ({ value }) => {
      return valToString(value);
    }
  }

  return reactColObj;
}