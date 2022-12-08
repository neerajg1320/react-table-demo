// Input is an array of objects
export function getKeyFromLabel(label) {
  return label.toLowerCase().replaceAll(/[\s./]/g, '_')
}

function insertKey(property, list) {
  list.push({
    "label": property,
    "key": property
  });
}

export function getColumns(data, sampleSize=0) {
  console.log(data);

  let finalData = data;
  if (sampleSize > 0) {
    finalData.slice(0, sampleSize);
  }

  const columns = [];

  finalData.forEach((row, index) => {
    const missing = []

    for (const property in row) {
      let missing_col = null;

      if (!columns.map(col => col.label).includes(property)) {
        missing_col = property;

        // columns.push(col);
        insertKey(property, columns);
      } else {

      }
    }
  });

  console.log(`columns=`, JSON.stringify(columns, null, 2));
  return columns;
}