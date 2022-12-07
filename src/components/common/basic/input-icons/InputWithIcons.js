import {RxLetterCaseCapitalize} from "react-icons/rx";
import {TbLetterW} from "react-icons/tb";
import {SiExpress} from "react-icons/si";
import {useState} from "react";
import FlagIcon from "./FlagIcon";
import './inputIcons.css';

const InputWithIcons = ({value, onChange, disabled}) => {
  const [caps, setCaps] = useState(false);
  const [word, setWord] = useState(false);
  const [regex, setRegex] = useState(false);

  const handleInputChange = (e) => {
    if (onChange) {
      onChange(e);
    }
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
            onChange={handleInputChange}
            style={{width: "200px"}}
        />

        <div
            className="filter-flags"
            style={{
              display:"flex",
              flexDirection:"row",
              gap:"4px",
              position: "absolute",
              right: "5px"
            }}
        >
          <FlagIcon value={caps} onChange={e => setCaps(!caps)}>
            <RxLetterCaseCapitalize />
          </FlagIcon>
          <FlagIcon value={word} onChange={e => setWord(!word)}>
            <TbLetterW />
          </FlagIcon>
          <FlagIcon value={regex} onChange={e => setRegex(!regex)}>
            <SiExpress />
          </FlagIcon>
        </div>
      </div>
  );
}

export default InputWithIcons;
