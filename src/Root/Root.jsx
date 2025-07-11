import React, { use } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { Outlet } from "react-router";
import { AuthContext } from "../AuthProvider/AuthProvider";
import LoadingSpinner from "../Components/Loading/LoadingSpinner";

const Root = () => {
  const { loading } = use(AuthContext);
  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <div className=" bg-base-200">
      {/* navbar  */}
      <div>
        <Navbar></Navbar>
      </div>
      {/* outlet */}
      <div>
        <Outlet></Outlet>
      </div>
      {/* footer */}
      <div className=" w-11/12 mx-auto">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Root;
