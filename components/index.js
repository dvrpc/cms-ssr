/*eslint-env browser*/
import React from "react";
import { render } from "react-dom";
import { GraphQLClient, ClientContext } from "graphql-hooks";

import App from "./App";

const client = new GraphQLClient({
  url: "https://cms.dvrpc.org/graphql",
});

const path = location.pathname === "/" ? "/index" : location.pathname;

render(
  <ClientContext.Provider value={client}>
    <App location={path} />
  </ClientContext.Provider>,
  document.getElementById("root")
);
