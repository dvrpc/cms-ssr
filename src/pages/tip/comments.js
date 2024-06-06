import React, { useState, render } from "react";
import response from "./NJTIPcommentResponse.json";
import "./defaults.css";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

const CommentViewer = ({ serverData }) => {
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
    data: serverData.data,
  };

  return (
    <div>
      <DataTableExtensions print={false} export={false} {...tableData}>
        <DataTable
          pagination
          expandableRows
          expandableRowsComponent={({ data }) => (
            <div className="flex">
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
  );
};

export default CommentViewer;

export async function getServerData({ params, query }) {
  try {
    return {
      props: response,
    };
  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {},
    };
  }
}
