import { graphql } from "gatsby";
import React, { useContext, useEffect } from "react";
import _ from "lodash";
import parse from "html-react-parser";
import Layout, { Ctx } from "../components/Layout";
import RelatedProjects from "../components/RelatedProjects";
import Fade from "../components/Fade";
import * as styles from "./project-page.module.scss";
import "./project-page.scss";

const ProjectPageWithCtx = ({ title, content }) => {
  const { state, dispatch } = useContext(Ctx);

  const fixVideoAspectRatio = () => {
    const videos = document.querySelectorAll("video");
    [...videos].forEach((video) => {
      if (video.videoHeight > video.videoWidth) {
        const percentage = `${(video.videoHeight / video.videoWidth) * 100}%`;
        video.parentElement.style.paddingBottom = percentage;
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", _.throttle(fixVideoAspectRatio, 1000));
    return window.removeEventListener(
      "scroll",
      _.throttle(fixVideoAspectRatio, 1000)
    );
  }, []);

  useEffect(() => {
    let observers;

    if ("IntersectionObserver" in window) {
      const options = { threshold: [0.5, 0.5] };
      const wrapper = document.querySelector("#pb");
      const els = wrapper.querySelectorAll("p");
      observers = [...els].map((el, index) => {
        const observer = new IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              dispatch({
                type: "SET_CASE_IMAGE",
                project: { caseImages: [...state.caseImages, index + 1] },
              });
            }
          });
        }, options);

        observer.observe(el);

        return { observer, el };
      });
    }

    return () => observers.map(({ observer, el }) => observer.unobserve(el));
  }, [dispatch, state.images]);

  useEffect(() => {
    const wrapper = document.querySelector("#pb");
    const els = wrapper.querySelectorAll("p");

    dispatch({
      type: "SET_CASE",
      project: { title, images: els.length },
    });

    dispatch({ type: "SHOW_PROJECT_META" });

    return () => dispatch({ type: "HIDE_PROJECT_META" });
  }, [dispatch, title]);

  return (
    <Fade>
      <div className={styles.wrapper}>
        <div id="pb" className={styles.images}>
          {parse(content)}
        </div>
      </div>
    </Fade>
  );
};

const ProjectPage = ({ data, location }) => {
  const {
    // eslint-disable-next-line camelcase
    title,
    content,
    categories,
    featuredImage,
  } = data.wpPost;

  useEffect(() => {
    document.body.style.overflow = "auto";
  }, []);

  return (
    <Layout
      {...{ location, title }}
      shareImage={
        featuredImage?.node?.localFile?.childImageSharp?.original?.src
      }
    >
      <ProjectPageWithCtx {...{ title, content }} />
      <RelatedProjects
        currentProject={{ title, category: categories.nodes[0].name }}
      />
    </Layout>
  );
};

export default ProjectPage;

export const pageQuery = graphql`
  query WordpressPost($id: String!) {
    wpPost(id: { eq: $id }) {
      title
      categories {
        nodes {
          name
        }
      }
      content
      featuredImage {
        node {
          localFile {
            childImageSharp {
              original {
                src
              }
            }
          }
        }
      }
    }
  }
`;
