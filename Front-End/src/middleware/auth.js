import React from "react";
import { Redirect } from "react-router-dom";

export const AuthorizeUser = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Redirect to={"/"}></Redirect>;
  }

  return children;
};

export const ProtectRoute = ({ children }) => {
  const username = localStorage.getItem("username");
  if (!username) {
    return <Redirect to={"/"}></Redirect>;
  }
  return children;
};
