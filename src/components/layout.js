import React from "react";
import {Link} from "gatsby";
import {IdentityContextProvider} from "react-netlify-identity-widget";

import "./layout.css";

export const Layout = ({children}) => {
  return (
    <IdentityContextProvider url="https://jamstack-mail-auth.netlify.app">
      <header>
        <Link to="/">JAMStack App</Link>
      </header>
      <main>{children}</main>
    </IdentityContextProvider>
  );
};
