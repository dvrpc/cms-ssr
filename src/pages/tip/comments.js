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

const title = "TIP Comments";

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
      name: "ID",
      cell: (row) => <Highlight data={row.commentid} input={input} />,
      sortable: true,
    },
    {
      name: "Commentor",
      cell: (row) => <Highlight data={row.commentor} input={input} />,
      sortable: true,
    },
    {
      name: "Agency",
      cell: (row) => <Highlight data={row.AGENCY} input={input} />,
      sortable: true,
    },
    {
      name: "PDF",
      cell: (row) => <Highlight data={row.FILELINK2} input={input} />,
      sortable: true,
      sortFunction: (a, b) =>
        (a.FILELINK2 === "") - (b.FILELINK2 === "") ||
        a.FILELINK2 - b.FILELINK2,
    },
  ];

  const tableData = {
    columns,
    data: filteredComments,
  };

  comments.map(
    (comment) => comment.FILELINK2 && console.log(comment.FILELINK2)
  );
  return (
    <>
      <div className="container mx-auto mb-8 px-8 py-4 md:grid-cols-[auto_1fr]">
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
              <Highlight data={data.comment} input={input} />
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
