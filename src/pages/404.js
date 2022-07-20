import * as React from "react";
import { Helmet } from "react-helmet";

const NotFoundPage = () => (
  <article>
    <Helmet title="404: Not found" />
    <h1>404: Not Found</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </article>
);

export default NotFoundPage;
