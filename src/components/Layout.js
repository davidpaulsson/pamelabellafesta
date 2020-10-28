import { withPrefix } from 'gatsby';
import React, { useReducer } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import useSiteMetadata from '../hooks/useSiteMetadata';
import _ from 'lodash';
import { AnimatePresence, motion } from 'framer-motion';

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
      return;
  }
};

const TemplateWrapper = ({
  children,
  title = null,
  description = null,
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
          content={`${withPrefix('/')}img/share/og-image.png`}
        />

        {isCategoryPage && <body className="category-page" />}
      </Helmet>

      <Header {...{ location }} />
      
      <AnimatePresence exitBeforeEnter>
        <motion.div 
          key={location.pathname} 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 0.2 }}>
          {children}
        </motion.div>
      </AnimatePresence>
    </Ctx.Provider>
  );
};

export default TemplateWrapper;
