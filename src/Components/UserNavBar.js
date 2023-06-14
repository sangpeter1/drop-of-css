import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UserNavBar = () => {
  const { cpg } = useSelector((state) => state);
  if (!cpg) {
    return null;
  }
  // console.log("in the User Nav", cpg);
  return <hr />;
};

export default UserNavBar;
