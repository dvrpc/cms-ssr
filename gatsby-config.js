require("dotenv").config({ path: `.env` });

module.exports = {
  siteMetadata: {
    title: `Delaware Valley Regional Planning Commission`,
    description: `The Delaware Valley Regional Planning Commission is the federally designated Metropolitan Planning Organization for a diverse nine-county region in two states: Bucks, Chester, Delaware, Montgomery, and Philadelphia in Pennsylvania; and Burlington, Camden, Gloucester, and Mercer in New Jersey.`,
    author: `Delaware Valley Regional Planning Commission <webmaster@dvrpc.org>`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-source-custom-api",
      options: {
        url: "https://www2.dvrpc.org/js/homepage/navigation.min.json", //your remote url
        rootKey: "nav",
        schemas: {
          NavItem: `
            link: String!
            href: String!
            style: String
            class: String
            links: [NavItem]
          `,
          nav: `
            link: String!
            href: String!
            style: String
            class: String
            links: [NavItem]
          `,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#f7f7f7`,
        theme_color: `#0078ae`,
        display: `minimal-ui`,
        icon: `src/images/bug-highres.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-drupal`,
      options: {
        baseUrl: `https://cms.dvrpc.org/`,
        basicAuth: {
          username: process.env.DRUPAL_USER,
          password: process.env.DRUPAL_PASS,
        },
        disallowedLinkTypes: [`contact_message--personal`, `view--view`],
        skipFileDownloads: true,
        filters: {
          "node--page":
            process.env.GATSBY_ENV === `development`
              ? `resourceVersion=rel:working-copy`
              : `filter[status][value]=1`,
        },
      },
    },
    `gatsby-plugin-emotion`,
    `gatsby-plugin-remove-trailing-slashes`,
    {
      resolve: `gatsby-plugin-web-font-loader`,
      options: {
        google: {
          families: [`Public Sans:400,400i,700,700i:latin&display=swap`],
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-9825778-1`,
      },
    },
    `gatsby-plugin-svg-sprite-loader`,
  ],
};
