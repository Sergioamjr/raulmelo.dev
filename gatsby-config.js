require('dotenv').config();
const R = require('ramda');

const { algoliaSetupOptions } = require('./helpers');

/* Defined based on branch name inside ./github/workflows/cy.yml */
const isProduction = R.path(['env', 'ENVIRONMENT'], process) === 'production';

module.exports = {
  siteMetadata: {
    title: 'Raul Melo',
    author: 'Raul Melo',
    siteUrl: 'https://raulmelo.dev',
    profilePic:
      'https://miro.medium.com/fit/c/256/256/1*6jtMoNvX_MHslzBLP4aM9g.jpeg',
    social: {
      twitter: 'https://twitter.com/raul_fdm',
      linkedIn: 'https://www.linkedin.com/in/raulfdm/',
      github: 'https://github.com/raulfdm',
    },
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/blog`,
        name: `blog`,
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-typescript`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-json`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Raul Melo - Site pessoal e Blog`,
        short_name: `Raul Melo`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `minimal-ui`,
        icon: `static/logo.png`, // This path is relative to the root of the site.
        localize: [
          {
            lang: `en`,
            name: `Raul Melo - Personal website and Blog`,
            short_name: `Raul Melo`,
          },
        ],
      },
    },
    {
      /* Resolve markdown -> html */
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 780,
              // https://github.com/gatsbyjs/gatsby/issues/20000
              // markdownCaptions: true,
              showCaptions: true,
              quality: 100,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: `<svg aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="20"><path fill="currentColor" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>`,
              className: `copy-title-icon`,
            },
          },
          {
            resolve: 'gatsby-remark-code-titles',
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: `gatsby-remark-prismjs`,
      options: {
        aliases: {
          env: `bash`,
          gitignore: `none`,
          gql: `graphql`,
          mdx: `markdown`,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Fira Code'],
        },
      },
    },
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        baseUrl: 'blog.gamedii.com.br/wp/',
        protocol: 'http',
        hostingWPCOM: false,
        useACF: true,
        verboseOutput: true,
        excludedRoutes: ['**/users', '**/settings', '**/themes'],
        includedRoutes: [
          '**/posts',
          '**/pages',
          '**/taxonomies',
          '**/menus',
          '**/media',
        ],
        normalizer: function ({ entities }) {
          return entities;
        },
      },
    },
  ].concat(
    isProduction
      ? [
          {
            resolve: `gatsby-plugin-algolia-search`,
            options: algoliaSetupOptions,
          },
          {
            resolve: 'gatsby-plugin-google-analytics',
            options: {
              trackingId: 'UA-160048702-1',
              head: false,
            },
          },
        ]
      : [],
  ),
};
