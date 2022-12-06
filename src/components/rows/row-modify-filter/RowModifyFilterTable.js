import {
  useTable,
  useRowSelect,
  useGlobalFilter,
  useFilters
} from "react-table";
import {useCallback, useEffect, useMemo, useState} from "react";
import '../../table.css';
import {RowCheckbox} from "../RowCheckbox";
import {ShowObject} from "../../show";
import {useDispatch, useSelector} from "react-redux";
import {deleteRows, editRows} from "../../../redux/actions";
import {FaTrash, FaPen } from "react-icons/fa";
import ColumnsEditExpandableBox from "../bulk-edit-box/ColumnsEditExpandableBox";
import {GlobalFilter} from "../../common/GlobalFilter";
import {ColumnFilter} from "../../common/ColumnFilter";
import Button from "react-bootstrap/Button";

export const RowModifyFilterTable = () => {
  // console.log(`Rendering <RowModifyFilterTable>`);

  // eslint-disable-next-line
  const [debugSelection, setDebugSelection] = useState(false);
  const [bulkEnabled, setBulkEnabled] = useState(false);
  const [bulkEditExpanded, setBulkEditExpanded] = useState(false);

  // Data variables
  const data = useSelector(state => state.rows);
  const columns = useSelector(state => state.columns);
  const dispatch = useDispatch();

  const bulkColumns = useMemo(() => {
    return columns.filter(col => col.bulk)
  }, []);

  const editColumns = useMemo(() => {
    return columns.filter(col => col.edit)
  }, []);

  // Show Debug Window
  // eslint-disable-next-line
  const [output, setOutput] = useState('');

  const onRowEditClick = useCallback(  (id) => {
    console.log(`row edit click id=${id}`);

    // eslint-disable-next-line
  }, []);

  const onRowDeleteClick = useCallback(  (id) => {
    // console.log(`delete click id=${id}`);
    dispatch(deleteRows([id]));
    // eslint-disable-next-line
  }, []);

  const onSelectionChange = useCallback(  (id) => {
    if (id === -1) {
      console.log('header clicked');
    } else {
      // console.log(`select click id=${id}`);
    }
  },[]);



  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter
    }
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state,
    setGlobalFilter
  } = useTable({
    columns,
    data,
    defaultColumn
  },
  useFilters,
  useGlobalFilter,
  useRowSelect,
  (hooks) => {
    hooks.visibleColumns.push((columns) => {
      return [
        {
          id: "selection",
          Header: ({getToggleAllRowsSelectedProps}) => (
              <RowCheckbox
                  {...getToggleAllRowsSelectedProps()}
                  onClick={e => onSelectionChange(-1)}
              />
          ),
          Cell: ({ row }) => (
            <RowCheckbox
                {...row.getToggleRowSelectedProps()}
                onClick={e => onSelectionChange(row.id)}
            />
          ),
          disableFilters: true
        },
        ...columns,
        {
          Header: "Modify",
          Cell: ({ row }) => (
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap:"10px"}}
            >
              <FaPen
                  style={{color:"rebeccapurple", cursor: "pointer"}}
                  onClick={e => onRowEditClick(row.original.id)}/>
              <FaTrash
                  style={{color:"mediumvioletred", cursor: "pointer"}}
                  onClick={e => onRowDeleteClick(row.original.id)}/>
            </div>
          ),
          disableFilters: true
        },
      ]
    })
  });

  useEffect(() => {
    if (selectedFlatRows.length > 0) {
      if (!bulkEnabled)
        setBulkEnabled(true);
    } else {
      if (bulkEnabled)
        setBulkEnabled(false);
    }
  }, [selectedFlatRows]);

  const getRowIds = useCallback((selRows) => {
    return selRows.map(row => {
      return row.original.id;
    });
  }, []);

  const handleBulkDeleteClick = useCallback(() => {
    const ids = getRowIds(selectedFlatRows);
    console.log(`handleBulkDeleteClick: ids=${ids}`);
    dispatch(deleteRows(ids));
    setBulkEditExpanded(false);
  }, [selectedFlatRows]);

  const handleBulkEditSaveClick = useCallback((values) => {
    const ids = getRowIds(selectedFlatRows);
    console.log(`handleBulkEditClick: ids=${ids} values=${JSON.stringify(values)}`);
    dispatch(editRows(ids, values));
    setBulkEditExpanded(false);
  }, [selectedFlatRows]);

  const handleBulkEditCancelClick = useCallback(() => {
    console.log(`handleBulkEditCancelClick`);
    setBulkEditExpanded(false);
  }, [])

  const { globalFilter } = state;

  return (
      <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
      <div>
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
                    disabled={!bulkEnabled}
                    onClick={handleBulkDeleteClick}
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
                        disabled={!bulkEnabled}
                        onClick={e => setBulkEditExpanded(!bulkEditExpanded)}
                >
                  Bulk Edit
                </Button>
              </div>

              {bulkEditExpanded && <ColumnsEditExpandableBox
                  columns={bulkColumns}
                  onEdit={handleBulkEditSaveClick}
                  onCancel={handleBulkEditCancelClick}
                  disabled={!bulkEnabled}
              />}
            </div>
          </div>

        </div>
      </div>

      <div>
      <table {...getTableProps()}>
        <thead>
        {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>
                      {column.render('Header')}
                      <div>{column.canFilter ? column.render('Filter') : null}</div>
                    </th>
                ))
              }
            </tr>
        ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        {
          rows.map(row => {
            prepareRow(row);
            return (
                <tr {...row.getRowProps()}>
                  {
                    row.cells.map(cell => {
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })
                  }
                </tr>
            );
          })
        }
        </tbody>
        <tfoot>
        {
          footerGroups.map(footerGroup => (
              <tr {...footerGroup.getFooterGroupProps()}>
                {
                  footerGroup.headers.map(column => (
                      <td {...column.getFooterProps()}>
                        {column.render('Footer')}
                      </td>
                  ))
                }
              </tr>
          ))
        }
        </tfoot>
      </table>
      </div>
      {debugSelection &&
        <div>
          <ShowObject object={output} />
          <ShowObject object={selectedFlatRows.map((row) => row.original)} />
        </div>
      }
      </>
  );
}