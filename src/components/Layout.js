import { withPrefix } from 'gatsby';
import React, { useReducer, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import useSiteMetadata from '../hooks/useSiteMetadata';
import _ from 'lodash';
import useDimensions from 'react-use-dimensions';

export const Ctx = React.createContext();
const defaultState = {
  title: '',
  images: 0,
  caseImages: [0],
  showProjectMeta: false,
  headerHeight: 0,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_HEADER_HEIGHT':
      return {
        ...state,
        headerHeight: action.headerHeight,
      };
    case 'SET_CASE':
      const {
        project: { title, images },
      } = action;
      return { ...state, title, images };
    case 'SET_CASE_IMAGE':
      const {
        project: { caseImages },
      } = action;
      return { ...state, caseImages: _(caseImages).sort().uniq().value() };
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
  location,
}) => {
  const {
    title: siteMetaTitle,
    description: siteMetaDescription,
  } = useSiteMetadata();

  const [state, dispatch] = useReducer(reducer, defaultState);

  const [ref, { height }] = useDimensions();
  useEffect(() => {
    dispatch({ type: 'SET_HEADER_HEIGHT', headerHeight: height });
  }, [height]);

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
      </Helmet>

      <div ref={ref}>
        <Header {...{ location }} />
      </div>

      {children}
    </Ctx.Provider>
  );
};

export default TemplateWrapper;
