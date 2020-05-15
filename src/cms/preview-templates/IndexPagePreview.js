import React from 'react';
import { IndexPageTemplate } from '../../templates/index-page';

const IndexPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS();

  if (data) {
    return (
      <>
        <div style={{ marginTop: '1em' }} />
        <IndexPageTemplate title={data.title} />
      </>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default IndexPagePreview;
