import React, { useContext } from "react";
import { Link } from "react-router-dom";
import style from "./Unauthorized.css";
import { AuthContext } from "../../context/AuthContext";

const Unauthorized = () => {
  const { user } = useContext(AuthContext);

  let navigateUrl;

  switch (user.role) {
    case "customer":
      navigateUrl = "/";
      break;
    case "admin":
      navigateUrl = "/admin";
      break;
    default:
      break;
  }

  return (
    <div className={style.container}>
      <div className={style.content}>
        <h1 className={style.title}>403 - Access Denied</h1>
        <p className={style.message}>
          You do not have the necessary permissions to access this page. Please
          contact your administrator if you believe this is a mistake.
        </p>
        <Link to={navigateUrl} className={style.homeLink}>
          Go to Home Page
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
