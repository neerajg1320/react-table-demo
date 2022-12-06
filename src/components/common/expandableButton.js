import React from "react";
import Button from "react-bootstrap/Button";

import {useState} from "react";

const ExpandableButton = ({ children, title, disabled }) => {
  const [expanded, setExpanded] = useState(false);

  const onButtonClick = (e) => {
    console.log('onButtonClick called')
    setExpanded(!expanded);
  }

  const childrenWithProps = React.Children.map(children, child => {
    // https://stackoverflow.com/questions/32370994/how-to-pass-props-to-this-props-children
    // avoids typescript error as well
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {onButtonClick});
    }
    return child;
  });

  return (
      <div style={{
        display:"flex",
        flexDirection:"column",
        position: "relative"
      }}>
        <Button variant="primary" size="sm"
                disabled={disabled}
                onClick={e => setExpanded(!expanded)}
        >
          {title}
        </Button>

        {expanded &&
            <div
                style={{
                  padding:"20px",
                  display: "flex",
                  flexDirection:"column",
                  gap:"15px",
                  boxShadow: "rgba(0, 0, 0, 0.5) 0px 5px 15px",
                  borderRadius: "4px",
                  position: "absolute",
                  left: "60px",
                  top: "25px",
                  backgroundColor: "white"
                }}
            >
              {childrenWithProps}
            </div>
        }
      </div>
  );
}

export default ExpandableButton;
