import React, { use } from "react";
import { Link, NavLink } from "react-router";

import logo from "../../assets/images/logo.png";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = use(AuthContext);
  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log("Sign-out successful");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="bg-base-100 shadow-sm">
      <div className="navbar w-11/12 mx-auto ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/coverage">Coverage</NavLink>
              </li>
              <li>
                <NavLink to="/addParcel">Add a parcel</NavLink>
              </li>
              {user && (
                <>
                  <li>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                  </li>
                  <li>
                    <NavLink to="/BeARider">Be A Rider</NavLink>
                  </li>
                </>
              )}
              <li>
                <NavLink to="/aboutUs">About Us</NavLink>
              </li>
            </ul>
          </div>
          <Link to="/">
            <div className=" flex  items-end">
              <img className=" mb-1" src={logo} alt="" />
              <p className=" -ml-2 text-3xl font-extrabold">ProFast</p>
            </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/coverage">Coverage</NavLink>
            </li>
            <li>
              <NavLink to="/addParcel">Add a parcel</NavLink>
            </li>
            {user && (
              <>
                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
                <li>
                  <NavLink to="/BeARider">Be A Rider</NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink to="/aboutUs">About Us</NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <button onClick={handleLogOut} className=" btn bg-lime-400">
              Logout
            </button>
          ) : (
            <Link className=" btn bg-lime-400" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
