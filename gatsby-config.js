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
    // {
    //   resolve: '@mkitio/gatsby-theme-password-protect',
    //   options: {
    //     password: 'kryddhylla',
    //   },
    // },
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        baseUrl: 'data.pamelabellafesta.se',
        protocol: 'https',
        restApiRoutePrefix: 'wp-json',
        hostingWPCOM: false,
        useACF: true,
        includedRoutes: ['**/posts', '**/pages', '**/media', '**/categories'],
        // searchAndReplaceContentUrls: {
        //   sourceUrl: 'data.pamelabellafesta.se',
        //   replacementUrl: 'pamelabellafesta.se',
        // },
        plugins: [
          {
            resolve: 'gatsby-wordpress-inline-images',
            options: {
              baseUrl: 'data.pamelabellafesta.se',
              protocol: 'https',
              withWebp: true,
              maxWidth: 1200,
              quality: 95,
              // tracedSVG: false,
              // base64: false,
            },
          },
        ],
      },
    },
  ],
};
