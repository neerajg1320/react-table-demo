export const filterEmptyValues = (rows, columnIds, filterValue) => {
  // console.log(`rows[]=${rows.length} columnsIds=${JSON.stringify(columnIds, null, 2)} filterValue=${filterValue}`);

  if (filterValue === undefined) {
    return rows;
  }

  if (filterValue === "") {
    return rows;
  }

  let flagBlank = false;
  if (filterValue === '"') {
    flagBlank = true;
  }

  const filteredRows = rows.filter((row, row_idx) => {
    // We can change below to for loop to use early termination
    // Doesn't make much difference now as we use only one column
    const filteredCols = columnIds.filter(colId => {
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

  // console.log(`Filtered Rows`, filteredRows);
  return filteredRows;

}