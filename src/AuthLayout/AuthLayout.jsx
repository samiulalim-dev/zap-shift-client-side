import React from "react";
import authImage from "../../src/assets/images/authImage.png";
import logo from "../../src/assets/images/logo.png";
import { Link, Outlet } from "react-router";
const AuthLayout = () => {
  return (
    <div className="w-11/12 mx-auto ">
      <div className="navbar pt-8">
        <Link to="/">
          <div className=" flex  items-end">
            <img className=" mb-1" src={logo} alt="" />
            <p className=" -ml-2 text-3xl font-extrabold">ProFast</p>
          </div>
        </Link>
      </div>
      <div className="hero-content my-10 flex-col lg:flex-row-reverse">
        <div className=" flex-1">
          <img src={authImage} className="max-w-sm rounded-lg shadow-2xl" />
        </div>
        <div className=" flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
