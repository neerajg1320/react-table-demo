import { useTable, useRowSelect } from "react-table";
import MOCK_DATA from "../../MOCK_DATA.json";
import { COLUMNS, GROUPED_COLUMNS } from '../../columns';
import {useCallback, useEffect, useMemo, useState} from "react";
import '../../table.css';
import {RowCheckbox} from "../RowCheckbox";
import {ShowObject} from "../../show";
import SelectedRowsBox from "../SelectedRowsBox";

export const RowDeleteTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);
  const [output, setOutput] = useState('');

  const onDeleteClick = (id) => {
    setOutput(`delete click id=${id}`);
  }

  const onSelectionChange = (id) => {
    if (id === -1) {
      console.log('header clicked');
    } else {
      // console.log(`select click id=${id}`);
    }
  };

  const handleBulkDeleteClick = useCallback((ids) => {
    console.log(`handleBulkDeleteClick: ids=${ids}`);
  }, []);

  const handleBulkEditClick = useCallback((ids) => {
    console.log(`handleBulkEditClick: ids=${ids}`);
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
              <button onClick={e => onDeleteClick(row.id)}>Delete</button>
          )
        },
      ]
    })
  });

  useEffect(() => {
    // console.log(`selectedFlatRows=${JSON.stringify(
    //     selectedFlatRows.map((row) => row.original), null, 2)}
    //   `);
  }, [selectedFlatRows]);


  const firstPageRows = rows.slice(0,10);

  return (
      <>
      {selectedFlatRows.length > 0 &&
          <SelectedRowsBox
              onEdit={handleBulkEditClick}
              onDelete={handleBulkDeleteClick}
              {...{selectedFlatRows, columns}}
          />
      }
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
          firstPageRows.map(row => {
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
      <ShowObject object={output} />
      <ShowObject object={selectedFlatRows.map((row) => row.original)} />
      </>
  );
}