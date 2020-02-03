/*eslint-env browser*/
import React from "react";
import PropTypes from "prop-types";
import { useQuery } from "urql";
import Layout from "./Layout";
import Main from "./Main";
import MenuQuery from "./MenuQuery.graphql";
import NotFound from "./NotFound";
import RouteQuery from "./RouteQuery.graphql";

const App = ({ location }) => {
  let content;
  let theme = {
    "color-background-banner": "#e7df8b",
    "color-background-content": "#f7f7f7",
    "color-background-nav": "#f7f7f7",
    "color-text-banner": "contrast(color-background-banner, color-dark)",
    "color-text-heading": "#0078ae",
    "color-text-content": "rgba(0, 0, 0, 0.67)",
    "color-text-heading-2": "#2d799a",
    "color-text-heading-3": "#4b6a77",
    "image-banner": "",
  };

  const [{ fetching, error, data }] = useQuery({
    query: RouteQuery,
    variables: { path: location },
  });
  const [{ fetching: fetchingMenu, error: errorMenu, data: menu }] = useQuery({
    query: MenuQuery,
  });

  if (fetching || fetchingMenu) {
    content = "Loading...";
  } else if (error || errorMenu) {
    console.warn("error", error.message);
    content = <p>{error.message}</p>;
  } else if (!data.route) {
    console.warn("no route", { data });
    content = <NotFound />;
  } else if (data.route) {
    theme = data.route.nodeContext.theme || theme;
    content = <Main {...data.route.nodeContext} location={location} />;
  }

  return <Layout nav={menu ? menu.menuByName.links : []} main={content} />;
};

App.propTypes = {
  location: PropTypes.string.isRequired,
};

export default App;
