import {useEffect, useState} from "react";

const SelectedRowsBox = ({ selectedFlatRows, columns }) => {
  const [bulkColumns, setBulkColumns] = useState([]);
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    setBulkColumns(columns.filter(col => col.bulk));
  }, [columns]);

  const handleBulkEditClick = () => {
    setExpanded(!expanded);
  }

  return (
    <div
        style={{
          display: "flex",
          flexDirection:"column",
          gap:"20px",
          padding:"10px",
          border: "1px dashed red"
        }}
    >
      <div>
        <button>Bulk Delete</button>
      </div>

      {bulkColumns.length > 0 && (

      <div style={{display:"flex"}}>
        <div style={{
          display:"flex",
          flexDirection:"column",
          border:"1px dashed green",
          position: "relative"
        }}>
          <div>
            <button onClick={handleBulkEditClick}>Bulk Edit</button>
          </div>

          {/* Columns and Save button, can be part of expandable*/}
          {expanded &&
          <div
              style={{
                padding:"10px",
                display: "flex",
                flexDirection:"column",
                gap:"10px",
                border:"1px solid blue",
                position: "absolute",
                left: "40px",
                top: "25px",
                backgroundColor: "white"
              }}
          >
            {/* We can try grid here*/}
            {bulkColumns.map(col => (
                <div style={{display:"flex", flexDirection:"row", gap:"10px"}}>
                  <span style={{width: "80px"}}>{col.Header}</span>
                  <span>{(col.type === "input") ?
                      <input type="text"/> :
                      (col.type === "select") ?
                      <select>
                        {col.choices.map(choice => (
                        <option value={choice}>{choice}</option>
                        ))}
                      </select>
                           :
                          ""
                  }</span>
                </div>
            ))}
            <div style={{
              display: "flex",
              justifyContent:"end",
              paddingRight: "20px"
            }}>
              <button>Save</button>
            </div>
          </div>
          }
        </div>
      </div>
      )}

    </div>
  );
}

export default SelectedRowsBox;