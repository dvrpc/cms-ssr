import React from "react";
import response from "./PATIPcommentResponse.json";
import "./defaults.css";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { graphql } from "gatsby";
import HeadTemplate, {
  defaultThemeConfig,
  themeToCustomVars,
} from "../../components/HeadTemplate";
import Avatar from "../../components/Avatar";
import ConnectWithUs from "../../components/ConnectWithUs";

const title = "TIP Comments";

const CommentViewer = ({ data }) => {
  const { userUser } = data;
  const { data: comments } = response;
  const columns = [
    {
      name: "ID",
      selector: (row) => row.commentid,
      sortable: true,
    },
    {
      name: "Commentor",
      selector: (row) => row.commentor,
      sortable: true,
    },
    {
      name: "Agency",
      selector: (row) => row.AGENCY,
      sortable: true,
    },
    {
      name: "PDF",
      selector: (row) => row.FILELINK2,
      sortable: true,
    },
    {
      name: "TIP Projects",
      cell: (row) => <div dangerouslySetInnerHTML={{ __html: row.MPMS }} />,
      sortable: true,
    },
  ];
  const tableData = {
    columns,
    data: comments,
  };

  return (
    <>
      <div className="container mx-auto mb-8 px-8 md:grid-cols-[auto_1fr]">
        <DataTableExtensions print={false} export={false} {...tableData}>
          <DataTable
            pagination
            expandableRows
            expandableRowsComponent={({ data }) => (
              <div className="flex divide-x">
                <div
                  className="w-1/2"
                  dangerouslySetInnerHTML={{ __html: data.comment }}
                />
                <div
                  className="w-1/2"
                  dangerouslySetInnerHTML={{ __html: data.Responses }}
                />
              </div>
            )}
          ></DataTable>
        </DataTableExtensions>
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
