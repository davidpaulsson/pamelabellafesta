module.exports = {
  siteMetadata: {
    title: 'Pamela Bellafesta',
    description: '',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        data: `
        @import "${__dirname}/src/styles/mixins.scss";
        @import "${__dirname}/src/styles/variables.scss";
        `,
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-wordpress-experimental',
      options: {
        url: 'https://data.pamelabellafesta.se/graphql',
      },
    },
  ],
};
