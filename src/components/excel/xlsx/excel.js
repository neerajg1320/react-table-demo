import * as XLSX from 'xlsx';

export function excelToJson (file) {
  // console.log(`excelToJson: ${file}`);

  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = function (e) {
      const bStr = e.target.result;

      const sheetJsons = [];

      const wb = XLSX.read(bStr, {type: 'binary', cellDates: true});
      wb.SheetNames.forEach((sheetName) => {
        const ws = wb.Sheets[sheetName];

        const sheetObj = {
          sheetName,
          data: XLSX.utils.sheet_to_json(ws)
        }

        sheetJsons.push(sheetObj);
      })

      resolve(sheetJsons);
    }

    fileReader.onerror = function (e) {
      console.log('Error reading excel file')
    }

    // We are reading an uploaded file
    fileReader.readAsBinaryString(file);
  });
}

export function  exportJsonToExcel(json, fileName='') {
  const dataType = 'application/vnd.ms-excel';
  const ws = XLSX.utils.json_to_sheet(json);
  const wb = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(wb, ws, 'test');
  XLSX.writeFile(wb, fileName);
}