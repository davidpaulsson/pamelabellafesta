import React from 'react';
import { InformationPageTemplate } from '../../templates/information-page';
import Header from '../../components/Header';

const InformationPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS();
  const { bio, clients, contact } = data;

  if (data) {
    return (
      <>
        <Header location={{ pathname: '/information' }} />
        <InformationPageTemplate {...{ bio, clients, contact }} />
      </>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default InformationPagePreview;
