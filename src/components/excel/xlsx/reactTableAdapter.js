import {valToString} from "../../../utils/types";

export function convertToReactCol (colObj) {
  const reactColObj = {
    Header: colObj.label,
    accessor:(row) => row[colObj.key],
    bulk: false,
    edit:false,
  };

  if (colObj.label.toLowerCase().includes('date')) {
    reactColObj.Cell = ({ value }) => {
      return valToString(value);
    }
  }

  return reactColObj;
}