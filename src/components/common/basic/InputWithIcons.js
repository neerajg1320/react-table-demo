import {RxLetterCaseCapitalize} from "react-icons/rx";
import {TbLetterW} from "react-icons/tb";
import {useState} from "react";
import './inputIcons.css';

const InputWithIcons = ({value, onChange, disabled}) => {
  const [caps, setCaps] = useState(false);
  const [word, setWord] = useState(false);

  return (
      <div
          style={{
            display: "flex",
            flexDirection:"row",
            gap:"4px",
            alignItems:"center"}}
      >
        <input
            disabled={disabled}
            className="form-control"
            value={value}
            onChange={onChange}
            style={{width: "120px"}}
        />

        <div className="filter-flags" style={{display:"flex", flexDirection:"row", gap:"4px"}}>
          <span
              className={`filter-caps ${caps ? "active" : ""}`}
              onClick={e => setCaps(!caps)}
              style={{cursor:"pointer", border:"1px dashed blue"}}
          >
            <RxLetterCaseCapitalize />
          </span>
          <span
              className={`filter-word ${word ? "active" : ""}`}
              onClick={e => setWord(!word)}
              style={{cursor:"pointer", border:"1px dashed blue"}}
          >
            <TbLetterW />
          </span>
        </div>
      </div>
  );
}

export default InputWithIcons;
