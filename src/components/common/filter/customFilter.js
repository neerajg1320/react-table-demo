export const filterEmptyValues = (rows, columnIds, filterValue) => {
  console.log(`rows[]=${rows.length} columnsIds=${JSON.stringify(columnIds, null, 2)}`);
  console.log(`filterValue=${JSON.stringify(filterValue, null, 2)}`);

  const { blank, filterText } = filterValue;
  
  // if (filterText === undefined) {
  //   return rows;
  // }

  if (!filterText && !blank) {
    return rows;
  }

  // let flagBlank = false;
  // if (filterText === '"' || blank) {
  //   flagBlank = true;
  // }


  const filteredRows = rows.filter((row, row_idx) => {
    // We can change below to for loop to use early termination
    // Doesn't make much difference now as we use only one column
    const filteredCols = columnIds.filter(colId => {
      console.log(`blank=${blank} filterText=${filterText}`);

      // If blank is set then look for blank match as well
      if (blank) {
        if (!row.values[colId]) {
          return true;
        }
      }

      if (row.values[colId] && row.values[colId].includes(filterText)) {
        return true;
      }

      return false;
    })

    return filteredCols.length > 0;
  });

  // console.log(`Filtered Rows`, filteredRows);
  return filteredRows;

}