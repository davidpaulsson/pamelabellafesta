import React from 'react';
import { IndexPageTemplate } from '../../templates/index-page';

const IndexPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS();

  if (data) {
    return <IndexPageTemplate title={data.title} />;
  } else {
    return <div>Loading...</div>;
  }
};

export default IndexPagePreview;
