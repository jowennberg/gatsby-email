import React from "react";
import "../global.css";
import {Form} from "../components/form";
import {Layout} from "../components/layout";

export default () => {
  return (
    <Layout>
      <h1>Send a Message</h1>
      <Form />
    </Layout>
  );
};
