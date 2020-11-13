import { withPrefix } from 'gatsby';
import React, { useReducer } from 'react';
import { Helmet } from 'react-helmet';
import _ from 'lodash';
import { AnimatePresence } from 'framer-motion';
import Header from './Header';
import useSiteMetadata from '../hooks/useSiteMetadata';

export const Ctx = React.createContext();
const defaultState = {
  title: '',
  images: 0,
  caseImages: [0],
  showProjectMeta: false,
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
      return { ...state, caseImages: _.sortedUniq(caseImages.sort()) };
    case 'SHOW_PROJECT_META':
      return { ...state, showProjectMeta: true };
    case 'HIDE_PROJECT_META':
      return { ...state, showProjectMeta: false };
    default:
  }
};

const TemplateWrapper = ({
  children,
  title = null,
  description = null,
  shareImage = null,
  isCategoryPage = false,
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

        {[16, 32, 48, 72, 96, 128, 144, 192, 256, 384, 512].map((sz) => (
          <link
            key={sz}
            rel="icon"
            type="image/png"
            href={`${withPrefix('/')}img/favicon/favicon-${sz}x${sz}.png`}
            sizes={`${sz}x${sz}`}
          />
        ))}

        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta
          property="og:title"
          content={title ? `${title} | ${siteMetaTitle}` : siteMetaTitle}
        />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`//pamelabellafesta.se${shareImage || withPrefix('/')}img/share/pamela-bellafesta-share.jpg`}
        />

        {isCategoryPage && <body className="category-page" />}
      </Helmet>

      <Header {...{ location }} />

      <AnimatePresence exitBeforeEnter>
        <div key={location?.pathname}>{children}</div>
      </AnimatePresence>
    </Ctx.Provider>
  );
};

export default TemplateWrapper;
