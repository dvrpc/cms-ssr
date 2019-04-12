import React from "react";
import ReactDOM from "react-dom";
import gql from "graphql-tag";
import { ApolloProvider, Query } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import Layout from "./Layout";
import NotFound from "./NotFound";
import Avatar from "./Avatar";
import ConnectWithUs from "./ConnectWithUs";

import "./App.css";

const RouteQuery = gql`
  query Route($path: String!) {
    route(path: $path) {
      ... on EntityCanonicalUrl {
        nodeContext {
          ... on NodePage {
            title
            fieldStaffContact {
              ... on FieldNodePageFieldStaffContact {
                entity {
                  ... on TaxonomyTermEditors {
                    fieldEmail
                    name
                    fieldPhoto {
                      alt
                      url
                    }
                    fieldTitle
                  }
                }
              }
            }
            body {
              processed
              summaryProcessed
            }
          }
        }
      }
    }
  }
`;

const App = ({ location }) => (
  <Query query={RouteQuery} variables={{ path: location }}>
    {({ data, loading, error }) => {
      if (loading) {
        return <div>Loading...</div>;
      }
      if (error) {
        console.warn(error.message);
        return <div style={{ color: "red" }}>{error.message}</div>;
      }
      if (!data.route) {
        console.warn(data);
        return (
          <Layout>
            <NotFound />
          </Layout>
        );
      }

      const { title, fieldStaffContact, body } = data.route.nodeContext;
      const content = (
        <main className="mh3 mw7">
          <h1>{title}</h1>
          <article dangerouslySetInnerHTML={{ __html: body.processed }} />
          <div className="flex justify-between bt b--light-silver">
            <Avatar contact={fieldStaffContact.entity} />
            <ConnectWithUs
              title={title}
              location={`https://www.dvrpc.org${location}`}
            />
          </div>
        </main>
      );
      return typeof document !== "undefined" ? (
        content
      ) : (
        <Layout title={title} description={body.summaryProcessed}>
          {content}
        </Layout>
      );
    }}
  </Query>
);

if (typeof document !== "undefined") {
  const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: "https://cms.dvrpc.org/graphql"
    }),
    cache: new InMemoryCache()
  });
  const app = (
    <ApolloProvider client={client}>
      <App
        location={location.pathname === "/" ? "/index" : location.pathname}
      />
    </ApolloProvider>
  );
  ReactDOM.hydrate(app, document.getElementById("root"));
}

export default App;
