import React from "react";
import prev from "../../images/prev.png";
const RightButton = (OnClick, OnDisable) => {
  return (
    <img
      src={prev}
      alt=""
      width="35px"
      onClick={OnClick}
      onDisable={OnDisable}
      height="35px"
      style={{ float: "right", marginTop: "220px", cursor: "pointer" }}
    />
  );
};

export default RightButton;
