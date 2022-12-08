// Input is an array of objects
export function getKeyFromLabel(label) {
  return label.toLowerCase().replaceAll(/[\s./]/g, '_')
}

function insertKey(key, list) {
  list.push(key);
}

export function getColumns(data, sampleSize=0) {
  console.log(data);

  let finalData = data;
  if (sampleSize > 0) {
    finalData.slice(0, sampleSize);
  }

  const columns = [];
  finalData.forEach((row, index) => {
    for (const property in row) {
      if (!columns.map(col => col.label).includes(property)) {
        const col = {
          "label": property,
          "key": property
        }
        // columns.push(col);
        insertKey(col, columns);
      }
    }
  });

  console.log(`columns=`, JSON.stringify(columns, null, 2));
  return columns;
}