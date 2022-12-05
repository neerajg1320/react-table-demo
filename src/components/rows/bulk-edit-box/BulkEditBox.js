import {useCallback, useEffect, useState} from "react";

const BulkEditBox = ({selectedFlatRows, columns, onDelete, onEdit}) => {
  const [bulkColumns, setBulkColumns] = useState([]);
  const [bulkExpanded, setsetBulkExpanded] = useState(false);
  // We haven't used state here as we do not want to rerender the component
  // when setting the bulkValues
  const bulkValues = [];

  useEffect(() => {
    setBulkColumns(columns.filter(col => col.bulk));
  }, [columns]);

  const getRowIds = useCallback(() => {
    return selectedFlatRows.map(row => {
      return row.original.id;
    });
  }, [selectedFlatRows]);

  const handleSaveClick = () => {
    setsetBulkExpanded(!bulkExpanded);
    const selectedIds = getRowIds();
    if (onEdit) {
      const modifiedFields = bulkValues
                              .filter(item => item.active)
                              .map(item => [item.name, item.value]);
      onEdit(selectedIds, Object.fromEntries(modifiedFields));
    }
  }

  const handleCancelClick = () => {
    setsetBulkExpanded(!bulkExpanded);
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
                onClick={e => setsetBulkExpanded(!bulkExpanded)}
            >
              Bulk Edit
            </button>
          </div>

          {/* Columns and Save button, can be part of expandable*/}
          {bulkExpanded &&
          <div
              style={{
                padding:"20px",
                display: "flex",
                flexDirection:"column",
                gap:"15px",
                boxShadow: "rgba(0, 0, 0, 0.5) 0px 5px 15px",
                position: "absolute",
                left: "40px",
                top: "25px",
                backgroundColor: "white"
              }}
          >
            {/* We can try grid here*/}
            {bulkColumns.map((col, col_idx) => {
                bulkValues.push({
                  active: false,
                  name: col.accessor
                });

                return (
                  <div key={col_idx}
                       style={{
                        display:"flex",
                        flexDirection:"row",
                        alignItems: "center",
                        gap:"10px"
                      }}
                  >
                    <span>
                      <input
                          type="checkbox"
                          onChange={e => {
                            bulkValues[col_idx].active = e.target.checked;
                          }}
                      />
                    </span>
                    <span style={{width: "80px"}}>{col.Header}</span>
                    <span>{(col.type === "input") ?
                        <input
                            type="text"
                            defaultValue=""
                            onChange={e => {
                              bulkValues[col_idx].value = e.target.value;
                            }}
                        /> :
                        (col.type === "select") ?
                        <select
                            defaultValue={bulkValues[col.accessor]}
                            onChange={e => {
                              bulkValues[col_idx].value = e.target.value;
                            }}
                        >
                          {col.choices.map((choice, ch_idx) => (
                            <option
                                key={ch_idx}
                                value={choice}
                            >
                              {choice}
                            </option>
                          ))}
                        </select>
                             :
                            ""
                    }</span>
                  </div>
              )}
            )}

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

export default BulkEditBox;