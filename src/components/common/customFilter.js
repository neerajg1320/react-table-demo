export const sampleFilter = (rows, columnIds, filterValue) => {
  // console.log(`rows[]=${rows.length} columnsIds=${JSON.stringify(columnIds, null, 2)} filterValue=${filterValue}`);

  if (filterValue === undefined) {
    return rows;
  }

  if (filterValue === "") {
    return rows;
  }

  let flagBlank = false;
  if (filterValue === '"') {
    console.log("Need to return blank remarks");
    flagBlank = true;
  }

  const filteredRows = rows.filter((row, row_idx) => {
    const filteredCols = columnIds.filter(colId => {
      // console.log(`row.values[colId]=${row.values[colId]} ${!row.values[colId]}`);
      if (flagBlank) {
        if (!row.values[colId]) {
          return true;
        }
      } else {
        if (row.values[colId] && row.values[colId].includes(filterValue)) {
          return true;
        }
      }

      return false;
    })

    return filteredCols.length > 0;
  });

  console.log(`Filtered Rows`, filteredRows);
  return filteredRows;

}