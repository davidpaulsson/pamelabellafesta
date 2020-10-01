import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/Layout';
import ProjectCategoryList from '../components/ProjectCategoryList';

const ProjectCategoryPage = ({ data, location }) => {
  return (
    <Layout title={data.wordpressCategory.name} {...{ location }}>
      <ProjectCategoryList projects={data.allWordpressPost.edges} />
    </Layout>
  );
};

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
                fluid(maxWidth: 1600, quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
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
    #             fluid(maxWidth: 1600, quality: 100) {
    #               ...GatsbyImageSharpFluid_withWebp_noBase64
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
