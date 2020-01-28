/*eslint-env browser*/
import React from "react";
import PropTypes from "prop-types";
import { useQuery } from "urql";
import Layout from "./Layout";
import NotFound from "./NotFound";
import Avatar from "./Avatar";
import ConnectWithUs from "./ConnectWithUs";

import "./App.css";

import RouteQuery from "./RouteQuery.graphql";
import MenuQuery from "./MenuQuery.graphql";

const App = ({ location }) => {
  let content;
  let title;
  let fieldStaffContact;
  let body = {};

  const [{ fetching, error, data }] = useQuery({
    query: RouteQuery,
    variables: { path: location }
  });
  const [{ fetching: fetchingMenu, error: errorMenu, data: menu }] = useQuery({
    query: MenuQuery
  });

  if (fetching || fetchingMenu) {
    content = "Loading...";
  } else if (error || errorMenu) {
    console.warn("error", error.message);
    content = <p style={{ color: "red" }}>{error.message}</p>;
  } else if (!data.route) {
    console.warn("no route", { data });
    content = <NotFound />;
  } else if (data.route) {
    ({ title, fieldStaffContact, body } = data.route.nodeContext);
    content = (
      <>
        <h1>{title}</h1>
        <article dangerouslySetInnerHTML={{ __html: body.processed }} />
        <div className="flex justify-between border-t b--light-silver">
          <Avatar contact={fieldStaffContact.entity} />
          <ConnectWithUs
            title={title}
            location={`https://www.dvrpc.org${location}`}
          />
        </div>
      </>
    );
  }

  return (
    <Layout
      title={title}
      description={body.summaryProcessed}
      nav={menu ? menu.menuByName.links : []}
    >
      <main className="mx-4" css={{ width: "48rem" }}>
        {content}
      </main>
    </Layout>
  );
};

App.propTypes = {
  location: PropTypes.string.isRequired
};

export default App;
