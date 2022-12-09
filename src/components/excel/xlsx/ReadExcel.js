import {useCallback, useRef, useState} from "react";
import Button from "react-bootstrap/Button";
import {excelToJson} from "./excel";
import {getColumns} from "./schema";
import {useDispatch} from "react-redux";
import {setColumns, setRows} from "../../../redux/actions";
import {convertToReactCol} from "../../adapters/reactTableAdapter";
import {AiOutlineClose} from "react-icons/ai";
import './readExcel.css';

const ReadExcel = ({onComplete}) => {
  const inputRef = useRef();
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();

  const onChange = (e) => {
    const files = [...e.target.files].map(file => file);
    setFiles(files);
  };

  const clearState = useCallback(() => {
    setFiles([]);
    inputRef.current.value = null;
  }, []);

  const handleSubmitClick = async (e) => {
    if (files.length > 0) {
      clearState();

      const sheetJsons = await excelToJson(files[0]);
      sheetJsons.forEach(sheetJson => {

        // TBD: We can probably move the column detection outside
        const columns = getColumns(sheetJson.data);
        // const reactColumns = columns.map(convertToReactCol);
        // dispatch(setColumns(reactColumns));
        dispatch(setColumns(columns));

        // We add the id field as our react table expects it for edit and delete operations
        const dataWithIds = sheetJson.data.map((item, item_idx) => {
          return {id: item_idx, ...item};
        });
        dispatch(setRows(dataWithIds));
      })

      if (onComplete) {
        onComplete();
      }
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

          <div
              className="file-input-control"
              style={{display:"flex", flexDirection:"row", alignItems:"center", position:"relative"}}
          >
            <form >
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
            <div
                className={`icon ${files.length ? "active" : ""}`}
                style={{position:"absolute", right:"10px"}}
            >
              <AiOutlineClose onClick={e => clearState()}/>
            </div>
          </div>

          <div>
            <Button
                className="btn-primary"
                onClick={handleSubmitClick}
                disabled={!files.length}
            >
              Submit
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ReadExcel;
