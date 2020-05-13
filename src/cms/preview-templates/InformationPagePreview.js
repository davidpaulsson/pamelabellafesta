import React from 'react';
import { InformationPageTemplate } from '../../templates/information-page';

const InformationPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS();

  if (data) {
    return <InformationPageTemplate title={data.title} />;
  } else {
    return <div>Loading...</div>;
  }
};

export default InformationPagePreview;
