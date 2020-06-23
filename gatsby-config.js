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
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        baseUrl: 'pamelabellafesta.local',
        protocol: 'http',
        restApiRoutePrefix: 'wp-json',
        hostingWPCOM: false,
        useACF: true,
        plugins: [
          {
            resolve: `@draftbox-co/gatsby-wordpress-inline-images`,
            options: {
              baseUrl: `pamelabellafesta.local`,
              protocol: `http`,
              withWebp: true,
            },
          },
        ],
      },
    },
  ],
};
