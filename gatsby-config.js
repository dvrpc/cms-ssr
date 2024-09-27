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
        skipFileDownloads: true,
        fastBuilds: true,
        filters: {
          "node--page":
            process.env.GATSBY_ENV === "development"
              ? ""
              : "filter[status][value]=1",
          "node--article": "filter[status][value]=1 include=field_tags ",
        },
      },
    },
    "gatsby-plugin-postcss",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-9825778-1",
      },
    },
    "gatsby-plugin-react-svg",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Delaware Valley Regional Planning Commission",
        short_name: "DVRPC",
        start_url: "/",
        background_color: "#fff",
        theme_color: "#0078ae",
        display: "standalone",
        icon: "src/images/bug-highres.png",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "src/data/",  // Path to your JSON files
      },
    },
    "gatsby-transformer-json",
    //"gatsby-plugin-offline",
  ],
};
