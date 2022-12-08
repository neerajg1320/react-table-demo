import {RowModifyFilterIconTable} from "../../tables/selection-table/row-modify-filtericon/RowModifyFilterIconTable";
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import {addColumn} from "../../../redux/actions";
import {useEffect, useState} from "react";
import {SmartFeatures} from "./SmartFeatures";

export const SmartTable = () => {


  return (
    <div >
      <SmartFeatures />
      <RowModifyFilterIconTable />
    </div>
  );
}