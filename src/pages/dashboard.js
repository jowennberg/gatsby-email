import React, {useEffect, useState} from "react";
import {Router} from "@reach/router";
import IdentityModal from "react-netlify-identity-widget";
import {Layout} from "../components/layout";
import {Profile} from "../components/profile";
import {RouteSecret} from "../components/route-secret";
import {RouteBase} from "../components/route-base";
import {RouteLogin} from "../components/route-login";
import {navigate} from "gatsby";

import "react-netlify-identity-widget/styles.css";

const Dashboard = ({location}) => {
  const [isVisible, setVisibility] = useState(false);

  useEffect(() => {
    if (location.pathname.match(/^\/dashboard\/?$/)) {
      navigate("/dashboard/login", {replace: true});
    }
  }, [location.pathname]);

  const showModal = (show) => setVisibility(show);

  return (
    <Layout>
      <Profile />
      <Router>
        <RouteBase path="/dashboard/base" />
        <RouteSecret path="/dashboard/secret" />
        <RouteLogin path="/dashboard/login" showModal={showModal} />
      </Router>
      <IdentityModal
        showDialog={isVisible}
        onCloseDialog={() => showModal(false)}
      />
    </Layout>
  );
};

export default Dashboard;
