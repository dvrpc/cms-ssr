/*eslint-env node*/
import express from "express";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  Provider,
  Client,
  dedupExchange,
  cacheExchange,
  fetchExchange,
  ssrExchange
} from "urql";
import ssrPrepass from "react-ssr-prepass";
import { ServerStyleSheet } from "styled-components";
import { HelmetProvider } from "react-helmet-async";
import "isomorphic-unfetch";

import AppComponent from "./components/App";

const app = express();
app.use(express.static(__dirname));

app.get(/^[^.]*$/, async (req, res) => {
  try {
    const location = req.url === "/" ? "/index" : req.url;
    console.log("Routing: " + location);

    const ssrCache = ssrExchange();

    const client = new Client({
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
      url: "https://cms.dvrpc.org/graphql",
      suspense: true
    });

    const helmetContext = {};
    const App = (
      <Provider value={client}>
        <HelmetProvider context={helmetContext}>
          <AppComponent location={location} />
        </HelmetProvider>
      </Provider>
    );
    await ssrPrepass(App);
    ssrCache.extractData();
    const sheet = new ServerStyleSheet();
    const html = renderToStaticMarkup(sheet.collectStyles(App));
    const css = sheet.getStyleTags();
    const { helmet } = helmetContext;

    const htmlString = `<!DOCTYPE html>
      <html lang="en" ${helmet.htmlAttributes.toString()}>
      <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
      ${css}
      </head>
      <body ${helmet.bodyAttributes.toString()}>
      ${html}
      </body>
      </html>`;
    res.send(htmlString);
  } catch (e) {
    console.error(e);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`);
  console.log("Press Ctrl+C to quit.");
});
