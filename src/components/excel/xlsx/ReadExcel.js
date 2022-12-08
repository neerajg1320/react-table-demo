import {useRef, useState} from "react";
import Button from "react-bootstrap/Button";
import {excelToJson} from "./excel";
import {getColumns} from "./schema";
import {useDispatch} from "react-redux";
import {setColumns, setRows} from "../../../redux/actions";

const ReadExcel = () => {
  const inputRef = useRef();
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();

  const onChange = (e) => {
    const files = [...e.target.files].map(file => file);
    setFiles(files);
  };

  const handleSubmitClick = async (e) => {
    if (files.length > 0) {
      setFiles([]);
      inputRef.current.value = null;

      const sheetJsons = await excelToJson(files[0]);
      sheetJsons.forEach(sheetJson => {
        const columns = getColumns(sheetJson.data);
        // console.log(`columns=${JSON.stringify(columns, null, 2)}`);
        const reactColumns = columns.map(col => {
          return {Header: col.label, accessor:col.key, bulk: false, edit:false}
        });
        // console.log(`reactColumns=${JSON.stringify(reactColumns, null, 2)}`);

        dispatch(setColumns(reactColumns));

        const dataWithIds = sheetJson.data.map((item, item_idx) => {
          return {id: item_idx, ...item};
        });
        dispatch(setRows(dataWithIds));
      })
    }
  };

  return (
    <div style={{height:"60vh", display:"flex", justifyContent:"center", alignItems:"center", border:"1px dashed transparent"}}>
      <div style={{
            height:"80%", width:"60%", border: "4px dashed gray",
            display: "flex", flexDirection:"column", justifyContent:"center", alignItems:"center"
          }}
      >
        <div style={{borderRadius:"4px", padding:"5px",
          display:"flex", flexDirection:"column", gap: "30px", justifyContent:"center", alignItems:"center"}}>
          <form >
            {/*<label htmlFor="upload">Upload File</label>*/}
            <input
                ref={inputRef}
                className="form-control"
                type="file"
                name="upload"
                id="upload"
                // multiple
                onChange={onChange}
            />
          </form>
          <div>
            <Button className="btn-primary" onClick={handleSubmitClick}>
              Submit
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ReadExcel;
