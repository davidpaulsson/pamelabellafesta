import { graphql } from 'gatsby';
import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import ProjectCategoryList from '../components/ProjectCategoryList';
import Fade from '../components/Fade';

const ProjectCategoryPage = ({ data, location }) => {
  useEffect(() => {
    document.body.style.overflow = 'auto';
  }, []);

  return (
    <Layout
      title={data.wpCategory.name}
      {...{ location }}
      isCategoryPage
    >
      <Fade>
        <ProjectCategoryList projects={data.allWpPost.edges} />
      </Fade>
    </Layout>
  );
};

export default ProjectCategoryPage;

export const pageQuery = graphql`
  query ProjectCategoryPageTemplateByID($id: String!) {
    wpCategory(id: { eq: $id }) {
      name
    }
    allWpPost(
      filter: { categories: { nodes: { elemMatch: { id: { eq: $id } } } } }
      sort: { fields: date, order: DESC }
    ) {
      edges {
        node {
          id
          title
          slug
          featuredImage {
            node {
              mediaDetails {
                height
                width
              }
              localFile {
                childImageSharp {
                  fluid(quality: 80, maxWidth: 1440) {
                    ...GatsbyImageSharpFluid_withWebp_noBase64
                  }
                }
              }
            }
          }
          # featured_media {
          #   media_details {
          #     height
          #     width
          #   }
          #   localFile {
          #     childImageSharp {
          #       fluid(quality: 80, maxWidth: 1440) {
          #         ...GatsbyImageSharpFluid_withWebp_noBase64
          #       }
          #     }
          #   }
          # }
        }
      }
    }
    # markdownRemark(id: { eq: $id }) {
    #   frontmatter {
    #     title
    #     category
    #   }
    # }
    # projects: allMarkdownRemark(
    #   filter: {
    #     frontmatter: {
    #       category: { eq: $category }
    #       templateKey: { eq: "project-page" }
    #     }
    #   }
    #   sort: { order: DESC, fields: frontmatter___date }
    # ) {
    #   edges {
    #     node {
    #       id
    #       frontmatter {
    #         title
    #         date
    #         category
    #         featuredImage {
    #           id
    #           childImageSharp {
    #             fluid {
    #               ...GatsbyImageSharpFluid
    #             }
    #             original {
    #               height
    #               width
    #             }
    #           }
    #         }
    #       }
    #       fields {
    #         slug
    #       }
    #     }
    #   }
    # }
  }
`;
