import {RxLetterCaseCapitalize} from "react-icons/rx";
import {TbLetterW} from "react-icons/tb";
import {SiExpress} from "react-icons/si";
import {useState} from "react";
import './inputIcons.css';

const InputWithIcons = ({value, onChange, disabled}) => {
  const [caps, setCaps] = useState(false);
  const [word, setWord] = useState(false);
  const [regex, setRegex] = useState(false);

  const InputIcon = ({ children, value, onChange }) => {
    return (
      <span
          className={`${value ? "active" : ""}`}
          onClick={e => onChange(!value)}
          style={{cursor:"pointer", border:"1px dashed lightblue", fontSize: "0.9em"}}
      >
        {children}
      </span>
    );
  }

  return (
      <div
          style={{
            position:"relative",
            display: "flex",
            flexDirection:"row",
            gap:"4px",
            alignItems:"start"
          }}
      >
        <input
            disabled={disabled}
            className="form-control"
            value={value}
            onChange={onChange}
            style={{width: "200px"}}
        />

        <div
            className="filter-flags"
            style={{
              display:"flex",
              flexDirection:"row",
              gap:"4px",
              // border:"1px dashed red",
              // position: "absolute",
              right: "5px"
            }}
        >
          <InputIcon value={caps} onChange={e => setCaps(!caps)}>
            <RxLetterCaseCapitalize />
          </InputIcon>
          <InputIcon value={word} onChange={e => setWord(!word)}>
            <TbLetterW />
          </InputIcon>
          <InputIcon value={regex} onChange={e => setRegex(!regex)}>
            <SiExpress />
          </InputIcon>
        </div>
      </div>
  );
}

export default InputWithIcons;
