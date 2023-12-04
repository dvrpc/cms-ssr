import * as React from "react";
import { graphql } from "gatsby";
import HeadTemplate, { themeToCustomVars } from "../components/HeadTemplate";
import StaffContact from "../components/StaffContact";
import HtmlParser from "../components/HtmlParser";
import { Link } from "gatsby";

const Page = ({ data: { nodePage } }) => {
  const { body, title, path, relationships } = nodePage;

  return (
    <>
      <div className="container mx-auto my-4 grid gap-x-12 print:block print:!max-w-full print:text-black sm:grid-cols-1 md:grid-cols-4">
        <div className="px-4 pt-0 print:p-0 md:col-span-3 md:col-start-2 md:row-start-2 md:p-0">
          <div className="flex w-full">
            <h1 className="max-w-[80ch] px-4 text-4xl font-bold text-[color:var(--color-h1)] print:max-w-full print:p-0 md:col-span-1 md:col-start-2 md:p-0">
              {title}
            </h1>
          </div>
          <main className="mt-4">
            <article className="border-b-2">
              <div className="flex">
                <p className="mt-auto mb-0">
                  <p className="w-full text-sm text-[#595959]">
                    {new Date(nodePage.created).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  {body.summary && (
                    <blockquote className="flex-1 border-l-8 border-[#91BEDC] border-opacity-[.45] pl-2 italic md:mr-4">
                      {body.summary}
                    </blockquote>
                  )}
                </p>
                {relationships.field_image && (
                  <img
                    className="border border-2 p-0.5"
                    src={relationships.field_image.url}
                  />
                )}
              </div>
              <HtmlParser html={body.processed ?? ""} />
              {nodePage.relationships && (
                <p className="m-0 text-[#7A7A7A]">
                  {relationships.field_tags.map((tag, idx) => (
                    <>
                      <Link
                        to={`/news/mediareleases/?filters=${tag.name.replace(
                          " ",
                          "-"
                        )}`}
                      >
                        {tag.name}
                      </Link>
                      {idx !== relationships.field_tags.length - 1 && ", "}
                    </>
                  ))}
                </p>
              )}
            </article>
          </main>
        </div>
        <div className="flex flex-col space-y-4 p-4 print:hidden md:col-span-1 md:col-start-1 md:row-start-2 md:mt-6 md:items-end md:p-0">
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
          <div className="w-full bg-[#EFF0F2] p-4 [&>*]:my-2">
            <h3 className="!mt-0 text-lg font-bold">MEDIA</h3>
            <p className="font-bold">Resources</p>
            <hr className="!m-0 border border-[#CDCDCD]" />
            <p>
              <a
                className="text-[#03688D] hover:underline"
                href="https://www.dvrpc.org/photosandlogos/pdf/dvrpc_logoguidelines.pdf"
              >
                DVRPC Logos and Guidelines
              </a>
              <br />
              <a
                className="text-[#03688D] hover:underline"
                href="https://www.dvrpc.org/photosandlogos/"
              >
                Executive Director and Headshots
              </a>
            </p>
            <p className="font-bold">Contact</p>
            <hr className="!m-0 border border-[#CDCDCD]" />
            <p className="my-2">
              Elise Turner:{" "}
              <a
                className="text-[#03688D] hover:underline"
                href="mailto:eturner@dvrpc.org"
              >
                eturner@dvrpc.org
              </a>
            </p>
          </div>
        </div>
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
