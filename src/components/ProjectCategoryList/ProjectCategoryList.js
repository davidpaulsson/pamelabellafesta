import React from "react";
import { Link } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import _ from "lodash";
import slugify from "slugify";
import * as styles from "./ProjectCategoryList.module.scss";

const ProjectCategoryList = ({ projects }) => {
  if (projects.length === 0) {
    return <p>No projects in this category</p>;
  }

  return (
    <div className={styles.grid}>
      {projects
        .filter(({ node }) =>
          _.has(node, "featuredImage.node.localFile.childImageSharp.fluid")
        )
        .map(({ node }) => {
          const { id, title, featuredImage, slug, categories } = node;
          const { height, width } = featuredImage.node.mediaDetails;

          return (
            <BackgroundImage
              key={id}
              Tag="div"
              className={[
                styles.bg,
                height > width ? styles.portrait : styles.landscape,
              ].join(" ")}
              backgroundColor="#fefefe"
              fluid={featuredImage.node.localFile.childImageSharp.fluid}
            >
              <Link
                to={`/${slugify(categories.nodes[0].name, {
                  lower: true,
                })}/${slug}`}
              >
                <div dangerouslySetInnerHTML={{ __html: title }} />
              </Link>
            </BackgroundImage>
          );
        })}
    </div>
  );
};

export default ProjectCategoryList;
