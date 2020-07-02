import { graphql } from 'gatsby';
// import React, { useContext, useEffect, useRef } from 'react';
import React, { useEffect, useState, useContext } from 'react';

// import useInView from 'react-cool-inview';
import Layout, { Ctx } from '../components/Layout';
// import Img from 'gatsby-image';
import RelatedProjects from '../components/RelatedProjects';
import styles from './project-page.module.scss';
import './project-page.scss';
import ReactDOM from 'react-dom';

// const ProjectImg = ({ image, index }) => {
//   const { state, dispatch } = useContext(Ctx);
//   const ref = useRef();
//   useInView(ref, {
//     threshold: 0.25,
//     onEnter: () => {
//       dispatch({
//         type: 'SET_CASE_IMAGE',
//         project: { caseImages: [...state.caseImages, index + 1] },
//       });
//     },
//     onLeave: () => {
//       dispatch({
//         type: 'SET_CASE_IMAGE',
//         project: {
//           caseImages: state.caseImages.filter((i) => i !== index + 1),
//         },
//       });
//     },
//   });

//   return (
//     <div ref={ref} className={styles.image}>
//       <Img fluid={image.image.childImageSharp.fluid} />
//     </div>
//   );
// };

// const ProjectPageTemplate = ({ title, category, images }) => {
//   const { dispatch } = useContext(Ctx);
//   useEffect(() => {
//     dispatch({
//       type: 'SET_CASE',
//       project: { title, images: images.length },
//     });

//     dispatch({ type: 'SHOW_PROJECT_META' });
//   }, [dispatch, title, images]);

//   return (
//     <>
//       <div className={styles.wrapper}>
//         <div className={styles.images}>
//           {images &&
//             images.map((image, index) => (
//               <ProjectImg key={index} {...{ image, index }} />
//             ))}
//         </div>
//       </div>
//       <RelatedProjects currentProject={{ title, category }} />
//     </>
//   );
// };
// import inView from 'in-view';

const ProjectPage = ({ data, location }) => {
  const { title, content, categories } = data.wordpressPost;
  const [els, setEls] = useState();
  // const { state, dispatch } = useContext(Ctx);

  useEffect(() => {
    const options = { rootMargin: '0px' };

    const observer = new IntersectionObserver(function (entries, observer) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        } else {
          console.log(entry);
        }
      });
    }, options);

    const els = document.querySelectorAll('.gatsby-image-wrapper, .wp-video');
    els.forEach((el) => {
      const t = ReactDOM.findDOMNode(el);
      console.log(el);
      observer.observe(el);
    });
  }, []);

  return (
    <Layout {...{ location, title }}>
      <div className={styles.wrapper}>
        <div
          className={styles.images}
          dangerouslySetInnerHTML={{
            __html: content
              .replace('<html><head></head><body>', '')
              .replace('</body></html>', '')
              .replace('<p><div', '<div')
              .replace('</p>\n', ''),
          }}
        />
      </div>
      <RelatedProjects
        currentProject={{ title, category: categories[0].name }}
      />
    </Layout>
  );

  // return (
  //   <Layout {...{ title, location }}>
  //     <ProjectPageTemplate {...{ title, category, images }} />
  //   </Layout>
  // );
};

export default ProjectPage;

export const pageQuery = graphql`
  query WordpressPost($id: String!) {
    wordpressPost(id: { eq: $id }) {
      title
      categories {
        name
      }
      content
    }
  }
`;
