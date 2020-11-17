module.exports = {
  siteMetadata: {
    title: `Delaware Valley Regional Planning Commission`,
    description: `The Delaware Valley Regional Planning Commission is the federally designated Metropolitan Planning Organization for a diverse nine-county region in two states: Bucks, Chester, Delaware, Montgomery, and Philadelphia in Pennsylvania; and Burlington, Camden, Gloucester, and Mercer in New Jersey.`,
    author: `Delaware Valley Regional Planning Commission <webmaster@dvrpc.org>`,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-express",
      options: {
        output: "public/gatsby-express.json",
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-transformer-json`,
      options: {
        typeName: "Nav",
      },
    },
    {
      resolve: `gatsby-source-remote-file`,
      options: {
        url: "https://www2.dvrpc.org/js/homepage/navigation.min.json", //your remote url
        name: "nav",
        ext: ".json",
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
        filters: {
          "node--page": `filter[status][value]=1`,
        },
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-remove-trailing-slashes`,
    {
      resolve: `gatsby-plugin-web-font-loader`,
      options: {
        google: {
          families: ["Public Sans:400,400i,700,700i:latin&display=swap"],
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
