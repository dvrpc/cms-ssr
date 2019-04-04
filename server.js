import "cross-fetch/polyfill";
import React from "react";
import express from "express";
import { ApolloProvider, renderToStringWithData } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import App from "./components/App";

const app = express();

app.use(express.static("dist"));

//Any URI that does NOT contain a period
app.get(/^[^\.]*$/, async (req, res) => {
  console.log("Routing: " + req.url);
  const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: "https://cms.dvrpc.org/graphql"
    }),
    cache: new InMemoryCache()
  });
  const app = (
    <ApolloProvider client={client}>
      <App location={req.url} />
    </ApolloProvider>
  );

  const clean = str =>
    str.replace(/[\n\r]/g, "").replace(/(?=<!--)([\s\S]*?)-->/g, "");

  renderToStringWithData(app).then(content => {
    res.status(200);
    res.write("<!doctype html>");
    res.write(clean(content));
    res.end();
  });
});

app.listen(3000);
console.log("Listening on: 3000");
