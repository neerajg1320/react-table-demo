import {RxLetterCaseCapitalize} from "react-icons/rx";
import {TbLetterW} from "react-icons/tb";
import {SiExpress} from "react-icons/si";
import {useEffect, useState} from "react";
import FlagIcon from "./FlagIcon";
import './inputIcons.css';

const InputWithIcons = ({defaultValue, onChange, disabled}) => {
  const [caps, setCaps] = useState(false);
  const [word, setWord] = useState(false);
  const [regex, setRegex] = useState(false);

  const handleInputChange = (e) => {
    onChange({text: e.target.value, flags:{}})
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
            defaultValue={defaultValue.text}
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
