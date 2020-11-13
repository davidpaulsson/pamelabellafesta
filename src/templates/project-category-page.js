import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/Layout';
import ProjectCategoryList from '../components/ProjectCategoryList';
import Fade from '../components/Fade';

const ProjectCategoryPage = ({ data, location }) => (
  <Layout
    title={data.wordpressCategory.name}
    {...{ location }}
    isCategoryPage
  >
    <Fade>
      <ProjectCategoryList projects={data.allWordpressPost.edges} />
    </Fade>
  </Layout>
);

export default ProjectCategoryPage;

export const pageQuery = graphql`
  query ProjectCategoryPageTemplateByID($id: String!) {
    wordpressCategory(id: { eq: $id }) {
      name
    }
    allWordpressPost(
      filter: { categories: { elemMatch: { id: { eq: $id } } } }
      sort: { order: DESC, fields: date }
    ) {
      edges {
        node {
          id
          title
          path
          featured_media {
            media_details {
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
