import React from 'react';
import Img from 'gatsby-image';

const PreviewCompatibleImage = ({ imageInfo, ...rest }) => {
  const imageStyle = { marginBottom: '8px' };

  const { childImageSharp, image } = imageInfo;

  if (!!image && !!image.childImageSharp) {
    return (
      <Img style={imageStyle} fluid={image.childImageSharp.fluid} {...rest} />
    );
  }

  if (!!childImageSharp) {
    return <Img style={imageStyle} fluid={childImageSharp.fluid} {...rest} />;
  }

  if (!!image && typeof image === 'string')
    return <img style={imageStyle} src={image} {...rest} />;

  return null;
};

export default PreviewCompatibleImage;
