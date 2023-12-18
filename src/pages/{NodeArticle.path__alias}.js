import * as React from "react";
import { graphql } from "gatsby";
import HeadTemplate, { themeToCustomVars } from "../components/HeadTemplate";
import StaffContact from "../components/StaffContact";
import HtmlParser from "../components/HtmlParser";
import { Link } from "gatsby";
import NewsRoomInfo from "../components/NewsRoomInfo";

const BackButton = () => (
  <Link
    className="flex font-bold text-[#03688D] no-underline"
    to="/news/mediareleases"
  >
    <span className="my-auto mr-2 h-5 w-5 rounded-full bg-[#03688D] text-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full scale-50 fill-current"
      >
        <path d="m17 0 3 3-10 9 10 9-3 3L5 12z" />
      </svg>
    </span>
    Back to News Page
  </Link>
);

const Page = ({ data: { nodePage } }) => {
  const { body, title, path, relationships } = nodePage;

  return (
    <>
      <div className="container mx-auto my-4 grid gap-x-12 print:block print:!max-w-full print:text-black sm:grid-cols-1 md:w-4/5 md:grid-cols-3">
        <div className="px-4 pt-0 print:p-0 md:col-span-2 md:col-start-2 md:row-start-2 md:p-0">
          <div className="flex w-full">
            <h1 className="w-full text-3xl font-bold text-[color:var(--color-h1)] print:max-w-full print:p-0 md:col-span-1 md:col-start-2 md:max-w-[80ch] md:p-0 md:text-4xl">
              {title}
            </h1>
          </div>
          <main className="mt-4">
            <article className="border-b-2">
              <div>
                {relationships.field_image && (
                  <img
                    className="h-full border border-2 object-contain p-0.5 md:float-right md:m-4 md:mt-0 md:h-64"
                    src={relationships.field_image.url}
                  />
                )}
                <p className="w-full text-sm text-[#595959]">
                  {new Date(nodePage.created).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>

                {body.summary && (
                  <blockquote className="border-l-8 border-[#91BEDC] border-opacity-[.45] pl-2 italic md:w-full">
                    {body.summary}
                  </blockquote>
                )}
                <HtmlParser html={body.processed ?? ""} />
              </div>
              {nodePage.relationships && (
                <p className="m-0 text-[#7A7A7A]">
                  {relationships.field_tags.map((tag, idx) => (
                    <>
                      <Link
                        to={`/news/mediareleases/?filters=${tag.name.replace(
                          " ",
                          "-"
                        )}`}
                        className="no-underline hover:underline"
                      >
                        {tag.name}
                      </Link>
                      {idx !== relationships.field_tags.length - 1 && ", "}
                    </>
                  ))}
                </p>
              )}
            </article>
            <p className="hidden md:block">
              <BackButton />
            </p>
          </main>
        </div>
        <div className="md:fle space-y-4 p-4 print:hidden md:col-span-1 md:col-start-1 md:row-start-2 md:mt-4 md:flex-col md:items-end md:p-0">
          <BackButton />
          <div className="w-full bg-[#EFF0F2] p-4 [&>*]:my-2">
            <h3 className="!mt-0 text-lg font-bold">RELATED</h3>
            {nodePage.field_stories.length > 0 && (
              <>
                <p className="font-bold">Stories</p>
                <hr className="!m-0 border border-[#CDCDCD]" />
                <p>
                  {nodePage.field_stories.map((story) => (
                    <a
                      className="block text-[#03688D] hover:underline"
                      href={story.uri}
                    >
                      {story.title}
                    </a>
                  ))}
                </p>
              </>
            )}
            {nodePage.field_products.length > 0 && (
              <>
                <p className="font-bold">Products</p>
                <hr className="!m-0 border border-[#CDCDCD]" />
                <p>
                  {nodePage.field_products.map((product) => (
                    <a
                      className="block text-[#03688D] hover:underline"
                      href={product.uri}
                    >
                      {product.title}
                    </a>
                  ))}
                </p>
              </>
            )}
            {nodePage.field_data_sets.length > 0 && (
              <>
                <p className="font-bold">Data Sets</p>
                <hr className="!m-0 border border-[#CDCDCD]" />
                <p>
                  {nodePage.field_data_sets.map((set) => (
                    <a
                      className="block text-[#03688D] hover:underline"
                      href={set.uri}
                    >
                      {set.title}
                    </a>
                  ))}
                </p>
              </>
            )}
            {nodePage.field_dvrpc_webpages.length > 0 && (
              <>
                <p className="font-bold">DVRPC Webpages</p>
                <hr className="!m-0 border border-[#CDCDCD]" />
                <p>
                  {nodePage.field_dvrpc_webpages.map((page) => (
                    <a
                      className="block text-[#03688D] hover:underline"
                      href={page.uri}
                    >
                      {page.title}
                    </a>
                  ))}
                </p>
              </>
            )}
            {nodePage.field_websites.length > 0 && (
              <>
                <p className="font-bold">Websites</p>
                <hr className="!m-0 border border-[#CDCDCD]" />
                <p>
                  {nodePage.field_websites.map((page) => (
                    <a
                      className="block text-[#03688D] hover:underline"
                      href={page.uri}
                    >
                      {page.title}
                    </a>
                  ))}
                </p>
              </>
            )}
          </div>
          <div className="hidden md:block">
            <NewsRoomInfo />
          </div>
        </div>
      </div>
      <div className="block w-full md:hidden">
        <NewsRoomInfo />
      </div>
      <StaffContact title={title} location={path.alias} />
    </>
  );
};

export const Head = ({ data }) => {
  const {
    nodePage: { body, title },
    nodeTheme,
  } = data;
  return HeadTemplate({
    title,
    summary: body?.summary,
    css: themeToCustomVars(nodeTheme),
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
      created
      relationships {
        field_image {
          url
        }
        field_tags {
          name
        }
      }
      field_data_sets {
        title
        uri
      }
      field_dvrpc_webpages {
        title
        uri
      }
      field_products {
        title
        uri
      }
      field_stories {
        title
        uri
      }
      field_websites {
        title
        uri
      }
    }
    navItem(href: { regex: "/news/i" }) {
      ...navitem
      links {
        ...navitem
      }
      parent {
        ...navitem
      }
    }
    nodeTheme(title: { eq: "News" }) {
      field_primary_color
      field_secondary_color
      field_third_color
      field_photo_credits
      relationships {
        field_banner_2x {
          uri {
            url
          }
        }
        field_banner {
          uri {
            url
          }
        }
      }
    }
    staffContact: userUser(mail: { eq: "ahastings@dvrpc.org" }) {
      name: field_display_name
      title: field_title
      mail
    }
  }

  fragment navitem on NavItem {
    href
    link
    style
    class
  }
`;

export default Page;
