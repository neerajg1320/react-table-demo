import {BiSearchAlt} from "react-icons/bi";
import {FaSearchPlus} from "react-icons/fa";
import {AiOutlineClose} from "react-icons/ai";
import {TiTick} from "react-icons/ti";
import ExpandableButton from "../ExpandableButton";
import {useCallback, useEffect, useState} from "react";
import InputWithIcons from "../basic/input-icons/InputWithIcons";

export const ColumnFilterWithIcon = ({ column }) => {
  const { filterValue, setFilter } = column;
  const [expanded, setExpanded] = useState(false);

  const [textEnabled, setTextEnabled] = useState(true);
  const [blankEnabled, setBlankEnabled] = useState(false);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    // Check if we need state
    const filterObject = {
      flagBlank: blankEnabled,
      flagText: textEnabled,
      filterText,
    }
    setFilter(filterObject);
  }, [blankEnabled, textEnabled, filterText]);

  const clearFilter = useCallback(() => {
    setExpanded(!expanded);
    setFilter(undefined);
  }, [expanded]);

  const searchIcon = (filterValue?.flagBlank || filterValue?.filterText) ?
      <FaSearchPlus
          onClick={e => setExpanded(!expanded)}
          style={{cursor: "pointer"}}
      /> :
      <BiSearchAlt
          onClick={e => setExpanded(!expanded)}
          style={{cursor: "pointer"}}
      />;

  return (
      <>
      <ExpandableButton
          title="S"
          icon={searchIcon}
          value={expanded}
          onChange={e => setExpanded(!expanded)}
          popupPosition={{bottom:"30px", left: "-100px"}}
      >
        <div style={{color:"black", display:"flex", flexDirection:"column", gap:"5px", alignItems: "start"}}>
          <div style={{width: "100%", color:"black", display:"flex", justifyContent: "space-between", gap: "10px"}}>
            <div
                style={{
                  color:"black",
                  display:"flex",
                  flexDirection:"row",
                  justifyContent: "start",
                  gap: "5px",
                  alignItems:"center"
                }}
            >
              <span style={{color:"black", fontSize:".8em", fontWeight: "normal" }}>
                {column.Header}
              </span>
              <BiSearchAlt  />
            </div>

            <div>
              <TiTick
                  style={{color:"green", fontSize: "1.3em", cursor:"pointer"}}
                  onClick={e => setExpanded(!expanded)}
              />
              <AiOutlineClose
                  onClick={e => clearFilter()}
                  style={{color:"red", cursor: "pointer"}}
              />
            </div>
          </div>

          <div style={{display:"flex", flexDirection:"row", justifyContent: "space-between", gap:"10px"}}>
            <input type="checkbox"
                   defaultChecked={true}
                   onChange={e => {
                     setTextEnabled(e.target.checked);
                   }}
            />
            <InputWithIcons
                disabled={!textEnabled}
                value={filterValue?.filterText || ''}
                onChange={(e) => {
                  setFilterText(e.target.value);
                }}
            />
          </div>

          <div style={{display:"flex", alignItems:"center", gap:"5px",
                       fontSize:"0.9em", fontWeight: "normal", marginTop: "5px"}}
          >
            <input type="checkbox"
                   onChange={e => {
                     setBlankEnabled(e.target.checked);
                   }}
            />
            <label >Blanks</label>
          </div>
        </div>
      </ExpandableButton>
      </>
  );
}