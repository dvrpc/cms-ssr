import React, { useState } from "react";
import response from "./PATIPcommentResponse.json";
import "./defaults.css";
import DataTable from "react-data-table-component";
import { graphql } from "gatsby";
import HeadTemplate, {
  defaultThemeConfig,
  themeToCustomVars,
} from "../../components/HeadTemplate";
import Avatar from "../../components/Avatar";
import ConnectWithUs from "../../components/ConnectWithUs";

const Highlight = ({ input, data }) => (
  <div
    dangerouslySetInnerHTML={{
      __html: input
        ? data.replace(
            new RegExp(input, "gi"),
            (match) => `<span class="bg-yellow-400 text-black">${match}</span>`
          )
        : data,
    }}
  />
);

const title = "Draft FY2025 TIP for Pennsylvania Public Comments and Responses";

const CommentViewer = ({ data, location }) => {
  const [input, setInput] = useState("");
  const comments = response.data;
  const [filteredComments, setFilteredComments] = useState([...comments]);
  const { userUser } = data;

  const onChange = (e) => {
    setInput(e.target.value);
    const filter = e.target.value.toLowerCase();
    setFilteredComments([]);
    let filteredComments = [...comments];
    filteredComments = filteredComments.filter(
      (item) =>
        item.commentid.includes(filter) ||
        item.commentor.toLowerCase().includes(filter) ||
        item.AGENCY.toLowerCase().includes(filter) ||
        item.MPMS.toLowerCase().includes(filter) ||
        item.comment.toLowerCase().includes(filter) ||
        item.Responses.toLowerCase().includes(filter)
    );
    setFilteredComments(filteredComments);
  };

  const columns = [
    {
      name: "Comment ID",
      cell: (row) => <Highlight data={row.commentid} input={input} />,
      sortable: true,
      maxWidth: "10%",
      sortFunction: (a, b) => a.commentid - b.commentid,
    },
    {
      name: "Commentor",
      cell: (row) => <Highlight data={row.commentor} input={input} />,
      sortable: true,
      sortFunction: (a, b) =>
        (a.commentor === "") - (b.commentor === "") ||
        a.AGENCY.toLowerCase().localeCompare(b.commentor.toLowerCase()),
    },
    {
      name: "Commentor Agency",
      cell: (row) => <Highlight data={row.AGENCY} input={input} />,
      sortable: true,
      sortFunction: (a, b) =>
        (a.AGENCY === "") - (b.AGENCY === "") ||
        a.AGENCY.toLowerCase().localeCompare(b.AGENCY.toLowerCase()),
    },
    {
      name: "PDF",
      cell: (row) => <Highlight data={row.FILELINK2} input={input} />,
      sortable: true,
      sortFunction: (a, b) =>
        (a.FILELINK2 === "") - (b.FILELINK2 === "") ||
        a.FILELINK2 - b.FILELINK2,
      maxWidth: "10%",
    },
    {
      name: "MPMS #",
      cell: (row) => <Highlight data={row.MPMS} input={input} />,
      sortable: true,
      sortFunction: (a, b) =>
        (a.MPMS === "") - (b.MPMS === "") || a.MPMS - b.MPMS,
    },
  ];

  const tableData = {
    columns,
    data: filteredComments,
  };

  return (
    <>
      <div className="container mx-auto mb-8 px-8 py-4 md:grid-cols-[auto_1fr]">
        <h1 className="mt-1 max-w-[80ch] px-4 text-4xl font-bold text-[color:var(--color-h1)] print:max-w-full print:p-0 md:col-span-2 md:col-start-2 md:p-0">
          {title}
        </h1>
        <p className="py-4">
          DVRPC firmly believes that meaningful public participation results in
          better planning outcomes. Public participation is a process, not a
          single event. DVRPC provides multiple opportunities for a wide variety
          of stakeholders, including vulnerable and historically marginalized
          populations, public officials, and the private sector, to provide
          comments on and stay informed about transportation planning and
          programming decisions. By incorporating local information, residents'
          lived experiences, and subject matter expertise, plans are more
          implementable, beneficial, and sustainable.
        </p>
        <input
          className="py- 1 rounded border px-2 outline-none"
          placeholder="Filter Data"
          value={input}
          onChange={onChange}
        />
        <DataTable
          {...tableData}
          pagination
          expandableRows
          expandableRowsComponent={({ data }) => (
            <div className="flex flex-row divide-x [&>*]:basis-1/2">
              <Highlight
                data={
                  data.comment
                    .trim()
                    .replace(/[\r\n]+/gm, "<br/>")
                    .replace(/â/g, "&rsquo;")
                    .replace(/â/g, "&#8220;")
                    .replace(/â/g, "&#8221;")
                    .replace(/Â\s/g, "")
                    .replace(
                      /[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*/g,
                      "<i>[email removed]</i>"
                    ) ?? ""
                }
                input={input}
              />
              <Highlight data={data.Responses} input={input} />
            </div>
          )}
        ></DataTable>
      </div>
      <div className="bg-gray-300 print:hidden">
        <div className="container mx-auto px-8 md:grid-cols-[auto_1fr]">
          <div className="-mr-4 items-center justify-between p-4 md:col-span-2 md:col-start-2 md:flex md:p-0">
            <Avatar {...userUser} />
            {location && (
              <ConnectWithUs
                title={title}
                location={`https://www.dvrpc.org${location}`}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export const Head = ({ data: { nodeTheme } }) =>
  HeadTemplate({
    title,
    summary: "Comments for TIP.",
    css: themeToCustomVars(nodeTheme, defaultThemeConfig),
  });

export const query = graphql`
  query {
    userUser(mail: { eq: "rmurphy@dvrpc.org" }) {
      id
      mail
      name: field_display_name
      title: field_title
    }
    nodeTheme(id: { eq: "2d4ae5b2-a003-5402-a010-aeaaf1c6ca50" }) {
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
  }
`;

export default CommentViewer;
