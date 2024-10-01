import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="w-full fixed-top bg-secondary p-2 fs-4 d-flex gap-5 text-center d-flex align-content-center justify-content-center border-bottom border-2 border-black">
      <Link
        className="text-light link-underline link-underline-opacity-0 fw-bold"
        to={"/"}
      >
        Home
      </Link>
      <Link
        className="text-light link-underline link-underline-opacity-0 fw-bold"
        to={"/user"}
      >
        User List
      </Link>
    </nav>
  );
};

export default NavBar;
