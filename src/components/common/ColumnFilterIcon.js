import {BiSearchAlt} from "react-icons/bi";
import {AiOutlineClose} from "react-icons/ai";
import {TiTick} from "react-icons/ti";
import ExpandableButton from "./expandableButton";
import {useState} from "react";

export const ColumnFilterIcon = ({ column }) => {
  const { filterValue, setFilter } = column;
  const [expanded, setExpanded] = useState(false);

  const clearFilter = () => {
    setExpanded(!expanded);
    setFilter("");
  }

  return (
      <>
      <ExpandableButton
          title="S"
          icon={<BiSearchAlt onClick={e => setExpanded(!expanded)} style={{cursor: "pointer"}}/>}
          value={expanded}
          onChange={e => setExpanded(!expanded)}
          popupPosition={{bottom:"30px", left: "-100px"}}
      >
        <div style={{color:"red", display:"flex", justifyContent: "space-between", gap: "10px"}}>
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
                style={{cursor: "pointer"}}
            />
          </div>
        </div>

        <input
            className="form-control"
            value={filterValue || ''}
            onChange={(e) => setFilter(e.target.value)}
            style={{width: "150px"}}
        />
      </ExpandableButton>
      </>
  );
}