import {BiSearchAlt} from "react-icons/bi";
import {AiOutlineClose} from "react-icons/ai";
import ExpandableButton from "./expandableButton";
import {useState} from "react";

export const ColumnFilterIcon = ({ column }) => {
  const { filterValue, setFilter } = column;
  const [expanded, setExpanded] = useState(false);

  return (
      <>
      <ExpandableButton
          title="S"
          icon={<BiSearchAlt onClick={e => setExpanded(!expanded)} style={{cursor: "pointer"}}/>}
          value={expanded}
          onChange={e => setExpanded(!expanded)}
          popupPosition={{bottom:"30px", left: "-100px"}}
      >
        <div style={{color:"red", display:"flex", justifyContent: "space-between"}}>
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
              Search
            </span>
            <BiSearchAlt  />
          </div>
          <AiOutlineClose onClick={e => setExpanded(!expanded)} style={{cursor: "pointer"}}/>
        </div>
        <div
            style={{
              display: "flex",
              justifyContent:"space-between",
              alignItems: "center",
              gap: "10px"
            }}
        >
          <span>
            <input value={filterValue || ''} onChange={(e) => setFilter(e.target.value)} />
          </span>

        </div>
      </ExpandableButton>
      </>
  );
}