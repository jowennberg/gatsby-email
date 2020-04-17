import React from "react";
import {Link} from "gatsby";
import {useIdentityContext} from "react-netlify-identity";

export const Profile = ({showModal}) => {
  const identity = useIdentityContext();
  const isLoggedId = identity && identity.isLoggedIn;
  const {user} = identity;

  return (
    <div className="dashboard-header">
      <nav>
        <Link to="/dashboard/secret" activeClassName="active">
          Secret Stuff
        </Link>
        <Link to="/dashboard/base" activeClassName="active">
          See your base
        </Link>
      </nav>
      {isLoggedId && (
        <span>
          {user.user_metadata.full_name}{" "}
          <button onClick={() => showModal(true)}>Logout</button>
        </span>
      )}
    </div>
  );
};
