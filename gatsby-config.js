module.exports = {
  siteMetadata: {
    title: "Pamela Bellafesta",
    description: "",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-sass",
      options: {
        additionalData: `
        @import "${__dirname}/src/styles/mixins.scss";
        @import "${__dirname}/src/styles/variables.scss";
        `,
      },
    },
    "gatsby-plugin-gatsby-cloud",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-wordpress",
      options: {
        url: "https://data.pamelabellafesta.se/graphql",
        html: {
          imageMaxWidth: 960,
        },
      },
    },
  ],
};
