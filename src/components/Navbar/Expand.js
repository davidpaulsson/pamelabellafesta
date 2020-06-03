import * as React from 'react';

function Expand(props) {
  return (
    <svg width="16" height="7" viewBox="0 0 16 7" fill="none" {...props}>
      <path d="M0 3h16v1H0zM0 0h16v1H0zM0 6h16v1H0z" />
    </svg>
  );
}

const MemoExpand = React.memo(Expand);
export default MemoExpand;
