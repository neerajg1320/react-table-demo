import {useEffect, useState} from "react";

const SelectedRowsEdit = ({ selectedFlatRows, columns }) => {
  const [bulkColumns, setBulkColumns] = useState([]);

  useEffect(() => {
    setBulkColumns(columns.filter(col => col.bulk));

  }, [columns]);

  return (
    <div style={{display: "flex", flexDirection:"column", gap:"5px", padding:"10px"}}>
      <div>
        <button>Bulk Delete</button>
      </div>
      {bulkColumns.length > 0 &&
        <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
          <button>Bulk Edit</button>
          <select>
            <option value="">Select...</option>
            {
              bulkColumns.map(col => (
                <option value={col.accessor}>{col.Header}</option>
              ))
            }
          </select>
        </div>
      }
    </div>
  );
}

export default SelectedRowsEdit;