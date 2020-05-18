import React from 'react';

const ProjectPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS();
  const { images } = data;

  if (data) {
    return (
      <div style={{ maxWidth: '800px', margin: '1em auto' }}>
        {images &&
          images.map(({ image }) => {
            return (
              <img
                src={getAsset(image).url}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  marginBottom: '8px',
                }}
              />
            );
          })}
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default ProjectPagePreview;
