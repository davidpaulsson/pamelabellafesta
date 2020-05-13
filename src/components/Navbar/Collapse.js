import * as React from "react";

function Collapse(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 13 13" fill="none" {...props}>
      <path fill="#000" d="M0 11.314L11.314 0l.707.707L.707 12.021z" />
      <path fill="#000" d="M.707 0l11.314 11.314-.707.707L0 .707z" />
    </svg>
  );
}

const MemoCollapse = React.memo(Collapse);
export default MemoCollapse;
