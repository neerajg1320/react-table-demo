import {format} from "date-fns";

const isoDateFormat = "yyyy-MM-dd";
const localDateFormat = "dd/MM/yyyy";

export function isString(val) {
  return (typeof val === 'string' || val instanceof String)
}

export function isDate(val) {
  return val instanceof Date && !isNaN(val)
}

export function valToString(val) {
  if (isDate(val)) {
    return format(val, localDateFormat);
  }

  return val.toString();
}