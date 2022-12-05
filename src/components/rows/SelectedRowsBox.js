import {useCallback, useEffect, useState} from "react";

const SelectedRowsBox = ({selectedFlatRows, columns, onDelete, onEdit}) => {
  const [bulkColumns, setBulkColumns] = useState([]);
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    setBulkColumns(columns.filter(col => col.bulk));
  }, [columns]);

  const getRowIds = useCallback(() => {
    return selectedFlatRows.map(row => {
      return row.original.id;
    });
  }, [selectedFlatRows]);

  const handleSaveClick = () => {
    setExpanded(!expanded);
    const selectedIds = getRowIds();
    if (onEdit) {
      onEdit(selectedIds);
    }
  }

  const handleCancelClick = () => {
    setExpanded(!expanded);
  }

  const handleDeleteClick = () => {
    const selectedIds = getRowIds();
    if (onDelete) {
      onDelete(selectedIds);
    }
  }

  return (
    <div
        style={{
          display: "flex",
          flexDirection:"column",
          gap:"20px",
          padding:"10px",
          // border: "1px dashed red"
        }}
    >
      <div>
        <button
            disabled={selectedFlatRows.length < 1}
            onClick={handleDeleteClick}
        >
          Bulk Delete
        </button>
      </div>


      <div style={{display:"flex"}}>
        <div style={{
          display:"flex",
          flexDirection:"column",
          position: "relative"
        }}>
          <div>
            <button
                disabled={selectedFlatRows.length < 1}
                onClick={e => setExpanded(!expanded)}
            >
              Bulk Edit
            </button>
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
            {bulkColumns.map((col, col_idx) => (
                <div key={col_idx} style={{display:"flex", flexDirection:"row", gap:"10px"}}>
                  <span style={{width: "80px"}}>{col.Header}</span>
                  <span>{(col.type === "input") ?
                      <input type="text"/> :
                      (col.type === "select") ?
                      <select>
                        {col.choices.map((choice, ch_idx) => (
                            // TBD:
                        <option key={ch_idx} value={choice}>{choice}</option>
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
              paddingRight: "20px",
              gap: "10px"
            }}>
              <button onClick={handleCancelClick}>Cancel</button>
              <button onClick={handleSaveClick}>Save</button>
            </div>
          </div>
          }
        </div>
      </div>

    </div>
  );
}

export default SelectedRowsBox;