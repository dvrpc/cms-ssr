/*eslint-env node*/
import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { GraphQLClient, ClientContext } from "graphql-hooks";
import { getInitialState } from "graphql-hooks-ssr";
import memCache from "graphql-hooks-memcache";
import fetch from "cross-fetch";
import { ServerStyleSheet } from "styled-components";
import Helmet from "react-helmet";

import AppComponent from "./components/App";

const app = express();
app.use(express.static(__dirname));

app.get(/^[^.]*$/, async (req, res) => {
  const location = req.url === "/" ? "/index" : req.url;
  console.log("Routing: " + location);
  const client = new GraphQLClient({
    ssrMode: true,
    url: "https://cms.dvrpc.org/graphql",
    cache: memCache(), // NOTE: a cache is required for SSR
    fetch
  });

  const App = (
    <ClientContext.Provider value={client}>
      <AppComponent location={location} />
    </ClientContext.Provider>
  );
  await getInitialState({ App, client });

  const sheet = new ServerStyleSheet();
  let html = renderToString(sheet.collectStyles(App));
  const styleTags = sheet.getStyleTags();
  sheet.seal();
  const helmet = Helmet.renderStatic();

  res.send(`<!DOCTYPE html>
  <html lang=en ${helmet.htmlAttributes.toString()}>
  <head>
  <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="/main.css" />
  ${helmet.title.toString()}
  ${helmet.meta.toString()}
  ${helmet.link.toString()}
  ${styleTags}
  </head>
  <body id=root ${helmet.bodyAttributes.toString()}>
  ${html}
  </body>
  </html>`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`);
  console.log("Press Ctrl+C to quit.");
});
