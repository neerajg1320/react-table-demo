import {RowModifyFilterIconTable} from "../../tables/selection-table/row-modify-filtericon/RowModifyFilterIconTable";
import Button from "react-bootstrap/Button";
import {useDispatch} from "react-redux";
import {addColumn} from "../../../redux/actions";
import {useState} from "react";

export const SmartTable = () => {
  const [categoryAdded, setCategoryAdded] = useState(false);
  const dispatch = useDispatch();

  const handleAddCategoryClick = (e) => {
    console.log(`Need to add a new column`);
    const categoryColumn = {
      label: "Category",
      key: "Category",
      edit: true,
      bulk: true,
      type: 'select',
      choices: [
          'Stationary', 'Salary', 'Travel'
      ]
    };

    const categoryRTColumn = {
      Header: "Category",
      accessor: "Category",
      width: "150",
      edit: true,
      bulk: true,
      type: 'select',
      choices: [
        'Stationary', 'Salary', 'Travel'
      ]
    };

    dispatch(addColumn(categoryRTColumn));
    setCategoryAdded(true);
  }

  return (
    <div >
      <div
          style={{
            display:"flex", flexDirection:"row", justifyContent:"space-between",alignItems:"top",
            border:"1px solid lightblue", borderRadius: "5px"
          }}
      >
        <div style={{marginLeft:"10px", marginTop:"3px", fontSize:"0.8em"}}>
          Smart Features
        </div>
        <div style={{padding: "20px"}}>
          <Button
              disabled={categoryAdded}
              className="btn-outline-primary bg-transparent"
              size="sm"
              onClick={handleAddCategoryClick}
          >
            Add Category
          </Button>
        </div>

      </div>
      <RowModifyFilterIconTable />
    </div>
  );
}