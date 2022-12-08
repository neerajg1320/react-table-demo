import * as XLSX from 'xlsx';

export function excelToJson (file) {
  console.log(`excelToJson: ${file}`);

  const fileReader = new FileReader();

  fileReader.onload = function (e) {
    // const data = new Uint8Array(e.target.result);
    const bStr = e.target.result;

    const wb = XLSX.read(bStr, {type: 'binary'});
    wb.SheetNames.forEach((sheetName) => {
      console.log(`${sheetName}`);
    })

  }

  fileReader.onerror = function (e) {
    console.log('Error reading excel file')
  }

  fileReader.readAsBinaryString(file);
}