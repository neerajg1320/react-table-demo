import {useCallback, useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import Select from "react-select";

const BulkEditBoxSelect = ({selectedFlatRows, columns, onDelete, onEdit}) => {
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
          flexDirection:"row",
          gap:"20px",
          padding:"10px",
        }}
    >
      <div>
        <Button variant="danger" size="sm"
            disabled={selectedFlatRows.length < 1}
            onClick={handleDeleteClick}
        >
          Bulk Delete
        </Button>
      </div>

      <div style={{display:"flex"}}>
        <div style={{
          display:"flex",
          flexDirection:"column",
          position: "relative"
        }}>
          <div>
            <Button variant="primary" size="sm"
                disabled={selectedFlatRows.length < 1}
                onClick={e => setsetBulkExpanded(!bulkExpanded)}
            >
              Bulk Edit
            </Button>
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
                borderRadius: "4px",
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
                    <div>
                      <input
                          type="checkbox"
                          onChange={e => {
                            bulkValues[col_idx].active = e.target.checked;
                          }}
                      />
                    </div>

                    <div style={{minWidth:"80px"}}>
                      {col.Header}
                    </div>

                    <div>{(col.type === "input") ?
                        <form>
                          <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                aria-describedby="emailHelp"
                                placeholder="Enter phone"
                                onChange={e => {
                                  bulkValues[col_idx].value = e.target.value;
                                }}
                            />
                          </div>
                        </form>
                        :
                        (col.type === "select") ?

                        <Select
                            options={col.choices.map(choice => {return {label: choice, value:choice}})}
                            value={bulkValues[col_idx].value}
                            onChange={option => {bulkValues[col_idx].value = option.value}}
                            styles={{container: provided => ({
                                ...provided,
                                width: 150
                              })}}
                            // isDisabled={false}
                        />
                             :
                            ""
                    }</div>
                  </div>
              )}
            )}

            <div style={{
              display: "flex",
              justifyContent:"end",
              paddingRight: "20px",
              gap: "10px"
            }}>
              <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={handleCancelClick}
              >
                Cancel
              </Button>
              <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSaveClick}
              >
                Save
              </Button>
            </div>
          </div>
          }
        </div>
      </div>

    </div>
  );
}

export default BulkEditBoxSelect;