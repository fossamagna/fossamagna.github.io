const codeGithub = require("remark-code-github").default;

module.exports = {
  siteMetadata: {
    title: `fossamagna's Blog`,
    author: {
      name: `Masahiko MURAKAMI`,
      // summary: `who lives and works in San Francisco building useful things.`,
    },
    description: `fossamagna's Blog`,
    siteUrl: `https://fossamagna.github.io/`,
    social: {
      twitter: `fossamagna`,
    },
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          '@fec/remark-a11y-emoji/gatsby',
          {
            resolve: `gatsby-remark-link-unfurl`,
            options: {
              processedUrlsFile: `${__dirname}/link-cache/cache.json`,
            },
          },
        ],
        remarkPlugins: [codeGithub],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "UA-86310859-1", // Google Analytics / GA
        ],
        pluginConfig: {
          head: true,
        }
      }
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) =>
              allMdx.edges.map(edge => {
                return {
                  ...edge.node.frontmatter,
                  description: edge.node.excerpt,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                }
              }),
            query: `
            {
              allMdx(
                limit: 1000,
                sort: {
                  order: DESC,
                  fields: [frontmatter___date]
                }
              ) {
                edges {
                  node {
                    frontmatter {
                      title
                      date
                    }
                    fields {
                      slug
                    }
                    excerpt
                  }
                }
              }
            }
          `,
          title: "fossamagna's Blog RSS Feed",
            output: `rss.xml`,
          },
        ],
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `fossamagna's Blog`,
        short_name: `fossamagna's Blog`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
