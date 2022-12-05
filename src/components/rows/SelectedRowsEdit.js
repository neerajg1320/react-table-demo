import {useEffect, useState} from "react";

const SelectedRowsEdit = ({ selectedFlatRows, columns }) => {
  const [bulkColumns, setBulkColumns] = useState([]);

  useEffect(() => {
    setBulkColumns(columns.filter(col => col.bulk));
  }, [columns]);

  return (
    <div
        style={{
          display: "flex",
          flexDirection:"column",
          gap:"20px",
          padding:"10px"
        }}
    >
      <div>
        <button>Bulk Delete</button>
      </div>

      {bulkColumns.length > 0 && (
      <div style={{display:"flex"}}>
        <div>
          <div>
            <button>Bulk Edit</button>
          </div>
          <div
              style={{
                border: "1px solid blue",
                marginTop: "10px",
                padding:"10px",
                display: "flex",
                flexDirection:"column",
                gap:"10px"
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
        </div>
      </div>
      )}

    </div>
  );
}

export default SelectedRowsEdit;