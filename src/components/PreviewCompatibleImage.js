import Img from 'gatsby-image';
import React from 'react';

const PreviewCompatibleImage = ({ imageInfo, ...rest }) => {
  const { childImageSharp, image } = imageInfo;

  if (!!image && !!image.childImageSharp) {
    return <Img fluid={image.childImageSharp.fluid} alt="" {...rest} />;
  }

  if (!!childImageSharp) {
    return <Img fluid={childImageSharp.fluid} alt="" {...rest} />;
  }

  if (!!image && typeof image === 'string') {
    return <img src={image} alt="" {...rest} />;
  }

  return null;
};

export default PreviewCompatibleImage;
