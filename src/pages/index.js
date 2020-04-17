import React from "react";
import "../global.css";
import {Link} from "gatsby";
import {Layout} from "../components/layout";

export default () => {
  return (
    <Layout>
      <h1>This app rules</h1>
      <p>Login to find out why!</p>
      <Link to="/dashboard">Go to the dashboard</Link>
      <Link to="/sendmail">Send a Mail</Link>
    </Layout>
  );
};
