import * as React from "react";

function Expand(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 16 7" fill="none" {...props}>
      <path fill="#000" d="M0 3h16v1H0zM0 0h16v1H0zM0 6h16v1H0z" />
    </svg>
  );
}

const MemoExpand = React.memo(Expand);
export default MemoExpand;
