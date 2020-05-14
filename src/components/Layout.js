import { withPrefix } from 'gatsby';
import React, { useReducer } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import useSiteMetadata from '../hooks/useSiteMetadata';

export const Ctx = React.createContext();
const defaultState = {
  title: '',
  images: 0,
  caseImages: [],
};
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_CASE':
      const {
        project: { title, images },
      } = action;
      return { ...state, title, images };
    case 'SET_CASE_IMAGE':
      const {
        project: { caseImages },
      } = action;
      return { ...state, caseImages };
    default:
      return;
  }
};

const TemplateWrapper = ({
  children,
  title = null,
  description = null,
  location,
}) => {
  const {
    title: siteMetaTitle,
    description: siteMetaDescription,
  } = useSiteMetadata();

  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <Ctx.Provider value={{ state, dispatch }}>
      <Helmet>
        <html lang="en" />
        <title>{title ? `${title} | ${siteMetaTitle}` : siteMetaTitle}</title>
        <meta name="description" content={description || siteMetaDescription} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix('/')}img/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-16x16.png`}
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix('/')}img/safari-pinned-tab.svg`}
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta
          property="og:title"
          content={title ? `${title} | ${siteMetaTitle}` : siteMetaTitle}
        />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${withPrefix('/')}img/og-image.jpg`}
        />
      </Helmet>

      <Header {...{ location }} />

      {children}
    </Ctx.Provider>
  );
};

export default TemplateWrapper;
