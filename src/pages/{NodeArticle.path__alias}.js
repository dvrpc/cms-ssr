import * as React from "react";
import { graphql, navigate } from "gatsby";
import HeadTemplate, { themeToCustomVars } from "../components/HeadTemplate";
import HtmlParser from "../components/HtmlParser";
import { Link } from "gatsby";
import NewsRoomInfo from "../components/newsroom/NewsRoomInfo";
import SharePage from "../components/newsroom/SharePage";
import LogoBar from "../components/LogoBar";
import Icon, { Search } from "../components/Icon";
import BannerArticle from "../images/banner-article.jpg";
import Footer from "../components/Footer";
import StaffContact from "../components/StaffContact";

const BackButton = () => {
  return (
    <button
      className="flex font-bold text-[#03688D] no-underline hover:underline"
      onClick={() => (history.state ? navigate(-1) : navigate("/news"))}
    >
      <span className="my-auto mr-2 flex h-5 w-5 rounded-full bg-[#03688D] font-bold text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="-ml-[0.1rem] h-full w-full scale-50 fill-current"
        >
          <path d="m17 0 3 3-10 9 10 9-3 3L5 12z" />
        </svg>
      </span>
      Back to News Page
    </button>
  );
};

const Page = ({ data: { nodePage, userUser }, location }) => {
  const { body, title, path, relationships } = nodePage;

  const onShareThisClick = () => {
    document.getElementById("mobile-share").classList.toggle("hidden");
  };

  const related = {
    Stories: nodePage.field_stories,
    Products: nodePage.field_products,
    "Data Sets": nodePage.field_data_sets,
    "DVRPC Webpages": nodePage.field_dvrpc_webpages,
    "Web Sites": nodePage.field_websites,
  };

  return (
    <>
      <header className="bg-white print:hidden">
        <LogoBar />
        <div
          className="relative h-[200px] w-full bg-cover bg-center md:h-[250px]"
          style={{ backgroundImage: `url(${BannerArticle})` }}
        >
          <div className="container mx-auto p-8">
            <form
              className="relative mb-4 bg-gradient-to-r from-white/80 via-white/80 to-transparent md:w-min md:pr-32"
              action="https://www.dvrpc.org/Search/"
            >
              <div className="pointer-events-none absolute flex h-full w-10 items-center justify-center">
                <Icon
                  use={Search}
                  className="inline-block h-6 flex-shrink-0 select-none text-gray-600"
                />
              </div>
              <div>
                <input
                  name="q"
                  placeholder="Search..."
                  aria-label="Search"
                  className="m-0 block w-72 min-w-0 border-0 border-none bg-transparent p-2 pl-10 placeholder-gray-600 focus:outline-none md:pl-12"
                />
              </div>
            </form>
          </div>
        </div>
      </header>

      <div className="container mx-auto my-4 grid gap-x-12 print:block print:!max-w-full print:text-black sm:grid-cols-1 md:w-4/5 md:grid-cols-3">
        <button
          className="absolute -mt-16 ml-7 rounded-lg border border-[#C6E6F8] p-1 px-3 text-[#C6E6F8] md:hidden"
          onClick={onShareThisClick}
        >
          Share this story
        </button>
        <div className="px-7 pt-0 print:p-0 md:col-span-2 md:col-start-2 md:row-start-2 md:mt-3 md:px-8 md:pl-0">
          <div id="mobile-share" className="mb-2 -mt-2 hidden md:hidden">
            <SharePage location={location.pathname} title={title} />
          </div>
          <div className="flex w-full max-[1300px]:flex-col">
            <div>
              <h1 className="w-full text-3xl font-bold text-[#03688d] print:max-w-full print:p-0 md:col-span-1 md:col-start-2 md:p-0">
                {title}
              </h1>
              {relationships.uid.field_display_name && (
                <p className="m-0 w-full text-[16px] italic text-[#595959]">
                  by {relationships.uid.field_display_name},{" "}
                  {relationships.uid.field_title}
                </p>
              )}
            </div>

            <span className="hidden md:block md:pl-[25px] min-[1300px]:ml-auto">
              <SharePage location={location.pathname} title={title} />
            </span>
          </div>
          <main className="mt-4">
            <article className="border-b-[1px] border-[#CDCDCD]">
              <div>
                {relationships.field_image && (
                  <figure className="h-full border-0 object-contain p-0.5 max-[1415px]:min-w-full md:mr-0 md:mt-0 min-[1415px]:float-right min-[1415px]:m-5 min-[1415px]:mr-0">
                    <img
                      className="border border-[#C2C2C2] object-contain p-0.5 md:h-full"
                      src={relationships.field_image.url}
                    />
                    <figcaption
                      className="text-[14px] leading-[16px] text-[#7A7A7A]"
                      style={{ fontFamily: "Roboto Condensed" }}
                    >
                      {nodePage.field_image.title}
                    </figcaption>
                  </figure>
                )}

                <p className="w-full text-[16px] text-[#595959]">
                  {new Date(nodePage.created).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>

                {body.summary && (
                  <blockquote className="border-[#91BEDC] border-opacity-[.45] text-[20px] italic leading-[1.4rem] md:w-full md:border-l-8 md:pl-3">
                    {body.summary}
                  </blockquote>
                )}
                <HtmlParser html={body.processed ?? ""} />
              </div>
              {nodePage.relationships && (
                <p
                  className="m-0 text-sm text-[#7A7A7A]"
                  style={{ fontFamily: "Roboto Condensed" }}
                >
                  {relationships.field_categories.map((tag, idx) => (
                    <>
                      <Link
                        to={`/news/?categories=${tag.name
                          .replace(/\s/g, "-")
                          .replace(/\&/g, "and")}`}
                        className="no-underline hover:underline"
                      >
                        {tag.name}
                      </Link>
                      {idx !== relationships.field_categories.length - 1 &&
                        ", "}
                    </>
                  ))}
                </p>
              )}
            </article>
            <span className="mt-6 hidden md:block">
              <BackButton />
            </span>
          </main>
        </div>
        <div className="space-y-4 p-4 px-7 print:hidden md:col-span-1 md:col-start-1 md:row-start-2 md:mt-4 md:flex-col md:items-end md:p-0 md:px-0">
          <BackButton />
          <div className="w-full bg-[#EFF0F2] p-4">
            <h3 className="text-lg font-bold md:mb-2">RELATED</h3>
            {Object.entries(related).map(
              ([sectionName, data]) =>
                data?.length > 0 && (
                  <>
                    <p className="mt-2 mb-1 font-bold">{sectionName}</p>
                    <hr className="!m-0 border-[#CDCDCD]" />
                    <p className="my-2">
                      {data.map((item) => (
                        <a
                          className="block text-[#03688D] hover:underline"
                          href={item.uri}
                          target="_blank"
                          key={item.uri}
                        >
                          {item.title}
                        </a>
                      ))}
                    </p>
                  </>
                )
            )}
          </div>
          <div className="hidden md:block">
            <NewsRoomInfo />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
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
      created
      relationships {
        field_image {
          url
        }
        field_tags {
          name
        }
        field_categories {
          name
        }
        uid {
          field_display_name
          field_title
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
      field_image {
        title
        alt
      }
    }
    navItem(href: { regex: "/news/i" }) {
      ...nestednavitem
    }
    userUser(mail: { eq: "eturner@dvrpc.org" }) {
      id
      mail
      name: field_display_name
      title: field_title
    }
  }
`;

export default Page;
