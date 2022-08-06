require("dotenv").config();

module.exports = {
  siteMetadata: {
    siteUrl: "https://www.dvrpc.org",
    title: "Delaware Valley Regional Planning Commission",
    description:
      "The Delaware Valley Regional Planning Commission is the federally designated Metropolitan Planning Organization for a diverse nine-county region in two states: Bucks, Chester, Delaware, Montgomery, and Philadelphia in Pennsylvania; and Burlington, Camden, Gloucester, and Mercer in New Jersey.",
  },
  plugins: [
    {
      resolve: "gatsby-source-custom-api",
      options: {
        url: "https://www.dvrpc.org/js/homepage/navigation.min.json", //your remote url
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
      resolve: "gatsby-source-drupal",
      options: {
        baseUrl: "https://cms.dvrpc.org/",
        basicAuth: {
          username: process.env.DRUPAL_USER,
          password: process.env.DRUPAL_PASS,
        },
        disallowedLinkTypes: ["contact_message--personal", "view--view"],
        skipFileDownloads: false,
        filters: {
          "node--page":
            process.env.GATSBY_ENV === "development"
              ? ""
              : "filter[status][value]=1",
        },
      },
    },
    "gatsby-plugin-postcss",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-9825778-1",
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/bug-highres.png",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    "gatsby-plugin-react-svg",
  ],
};
