import React from 'react';
import { ProjectPagePreviewTemplate } from '../../templates/project-page';

const ProjectPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS();
  const { images } = data;

  if (data) {
    return (
      <>
        <div style={{ marginTop: '1em' }} />
        <ProjectPagePreviewTemplate {...{ images }} />
      </>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default ProjectPagePreview;
