export const filterEmptyValues = (rows, columnIds, filterValue) => {
  // console.log(`rows[]=${rows.length} columnsIds=${JSON.stringify(columnIds, null, 2)}`);
  // console.log(`filterValue=${JSON.stringify(filterValue, null, 2)}`);

  const { flagBlank, flagText, filterText, textFlags } = filterValue;

  // None of the filters is active
  if (!flagText && !flagBlank) {
    return rows;
  }

  // Blank filter is not active, Text filter is active but textbox is empty
  if (!flagBlank && (flagText && !filterText)) {
    return rows;
  }

  console.log(`textFlags=${JSON.stringify(textFlags, null, 2)}`);

  const filteredRows = rows.filter((row, row_idx) => {
    // We can change below to for loop to use early termination
    // Doesn't make much difference now as we use only one column
    const filteredCols = columnIds.filter(colId => {
      // console.log(`flagBlank=${flagBlank} filterText=${filterText}`);

      // If blank is set then look for blank match as well
      if (flagBlank) {
        if (!row.values[colId]) {
          return true;
        }
      }

      if (flagText) {
        if (filterText) {
          if (row.values[colId] && row.values[colId].includes(filterText)) {
            return true;
          }
        } else {
          return true;
        }
      }
      return false;
    })

    // console.log(`row:${row_idx} filteredCols=${JSON.stringify(filteredCols)}`);
    return filteredCols.length > 0;
  });

  // console.log(`Filtered Rows`, filteredRows);
  return filteredRows;

}