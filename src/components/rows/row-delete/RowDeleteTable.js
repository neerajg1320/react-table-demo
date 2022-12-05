import { useTable, useRowSelect } from "react-table";
import {useCallback, useEffect, useMemo, useState} from "react";
import '../../table.css';
import {RowCheckbox} from "../RowCheckbox";
import {ShowObject} from "../../show";
import SelectedRowsBox from "../SelectedRowsBox";
import {useDispatch, useSelector} from "react-redux";
import {deleteRows} from "../../../redux/actions";

export const RowDeleteTable = () => {
  const [debugSelection, setDebugSelection] = useState(false);

  // Data variables
  const data = useSelector(state => state.rows);
  const columns = useSelector(state => state.columns);
  const dispatch = useDispatch();

  // Debug Window
  const [output, setOutput] = useState('');

  const onRowDeleteClick = useCallback(  (id) => {
    setOutput(`delete click id=${id}`);
  }, []);

  const onSelectionChange = useCallback(  (id) => {
    if (id === -1) {
      console.log('header clicked');
    } else {
      // console.log(`select click id=${id}`);
    }
  },[]);

  const handleBulkDeleteClick = useCallback((ids) => {
    console.log(`handleBulkDeleteClick: ids=${ids}`);
    dispatch(deleteRows(ids));
  }, []);

  const handleBulkEditClick = useCallback((ids, values) => {
    console.log(`handleBulkEditClick: ids=${ids} values=${JSON.stringify(values)}`);
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    selectedFlatRows
  } = useTable({
    columns,
    data
  },
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
          )
        },
        ...columns,
        {
          Header: "Delete",
          Cell: ({ row }) => (
              <button onClick={e => onRowDeleteClick(row.id)}>Delete</button>
          )
        },
      ]
    })
  });

  return (
      <>
      <div>
        {(selectedFlatRows.length > 0 || true) &&
            <SelectedRowsBox
                onEdit={handleBulkEditClick}
                onDelete={handleBulkDeleteClick}
                {...{selectedFlatRows, columns}}
            />
        }
      </div>

      <div>
      <table {...getTableProps()}>
        <thead>
        {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
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