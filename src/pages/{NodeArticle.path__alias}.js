import * as React from "react";
import { graphql } from "gatsby";
import DrupalPage from "../components/DrupalPage";
import HeadTemplate from "../components/HeadTemplate";

const Page = ({ data: { nodePage } }) => {
  console.log(nodePage.body.processed);
  nodePage.relationships = {
    field_staff_contact: {
      field_display_name: "Alison Hastings",
      field_title: "Associate Director, Communications and Engagement",
      mail: "ahastings@dvrpc.org",
    },
  };
  const data = {
    nodePage,
    navItem: {
      href: "/News/",
      link: "News",
      style: null,
      class: null,
      links: [
        {
          href: "/News/MediaReleases/",
          link: "Media Releases",
          style: null,
          class: null,
        },
        {
          href: "/Newsletters/DVRPCNews/",
          link: "DVRPC News",
          style: null,
          class: null,
        },
        {
          href: "/AnnualReport/",
          link: "Annual Report",
          style: null,
          class: null,
        },
        {
          href: "/PhotosAndLogos/",
          link: "Photos and Logos",
          style: null,
          class: null,
        },
      ],
      parent: {
        href: "/About/",
        link: "About Us",
        style: null,
        class: null,
        links: [
          {
            href: "/WhoWeAre/",
            link: "Who We Are",
            style: null,
            class: null,
          },
          {
            href: "/WorkProgram/",
            link: "Planning Work Program",
            style: null,
            class: null,
          },
          {
            href: "/News/",
            link: "News",
            style: null,
            class: null,
          },
          {
            href: "/HumanResources/",
            link: "Jobs at DVRPC",
            style: null,
            class: null,
          },
          {
            href: "/Business/",
            link: "Business Opportunities",
            style: null,
            class: null,
          },
          {
            href: "/Policies/",
            link: "Policies",
            style: null,
            class: null,
          },
        ],
        parent: null,
      },
    },
  };
  return <DrupalPage data={data} />;
};

export const Head = ({ data }) => {
  const {
    nodePage: { body, title },
  } = data;
  return HeadTemplate({
    title,
    summary: body?.summary,
  });
};

export const query = graphql`
  query ($id: String) {
    nodePage: nodeArticle(id: { eq: $id }) {
      id
      title
      body {
        processed
        summary
      }
      path {
        alias
      }
    }
  }
`;

export default Page;
