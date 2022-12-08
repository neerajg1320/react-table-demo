// Input is an array of objects
export function getKeyFromLabel(label) {
  return label.toLowerCase().replaceAll(/[\s./]/g, '_')
}

export function getColumns(data, sampleSize=0) {
  console.log(data);

  let finalData = data;
  if (sampleSize > 0) {
    finalData.slice(0, sampleSize);
  }

  const columns = [];
  finalData.forEach((row, index) => {
    // console.log(`${JSON.stringify(row, null, 2)}`);
    if (index < 1) {
      for (const property in row) {
        if (!columns.includes(property)) {
          const col = {
            "label": property,
            // "key": getKeyFromLabel(property)
            "key": property
          }
          columns.push(col);
        }
      }
    }
  });

  console.log(`columns=`, JSON.stringify(columns, null, 2));
  return columns;
}