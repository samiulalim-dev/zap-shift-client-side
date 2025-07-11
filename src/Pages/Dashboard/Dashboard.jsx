import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
  MdAdminPanelSettings,
  MdAssignmentInd,
  MdAssignmentTurnedIn,
} from "react-icons/md";
import {
  FaHome,
  FaBox,
  FaMoneyCheckAlt,
  FaSearchLocation,
  FaUserEdit,
  FaUserClock,
  FaCheck,
  FaTasks,
  FaWallet,
} from "react-icons/fa";
import logo from "../../assets/images/logo.png";
import useAdmin from "../../Hooks/useAdmin/useAdimin";
import LoadingSpinner from "../../Components/Loading/LoadingSpinner";
import useRider from "../../Hooks/useRider/useRider";
const Dashboard = () => {
  const { isAdmin, isPending } = useAdmin();
  const { isRider, isLoading } = useRider();
  // console.log(isRider);
  // console.log(isAdmin);

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content  ">
        <div className="drawer">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex lg:hidden flex-col">
            {/* Navbar */}
            <div className="navbar  bg-base-300 w-full">
              <div className="flex-none lg:hidden">
                <label
                  htmlFor="my-drawer-3"
                  aria-label="open sidebar"
                  className="btn btn-square btn-ghost"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-6 w-6 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
              </div>
              <Link to="/dashboard" className="mx-1 px-1 flex-1">
                Dashboard
              </Link>

              <div className="hidden flex-none lg:hidden">
                <ul className="menu menu-horizontal">
                  {/* Navbar menu content here */}
                  <li>
                    <a>Navbar Item 1</a>
                  </li>
                  <li>
                    <a>Navbar Item 2</a>
                  </li>
                </ul>
              </div>
            </div>
            {/* Page content here */}
          </div>

          <div className="drawer-side">
            <label
              htmlFor="my-drawer-3"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 min-h-full w-80 p-4">
              {/* Sidebar content here */}
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "underline text-lime-600" : "text-black"
                  }
                >
                  <FaHome className="inline mr-2" /> Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/myParcel"
                  className={({ isActive }) =>
                    isActive ? "underline text-lime-600" : "text-black"
                  }
                >
                  <FaBox className="inline mr-2" /> My Parcel
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/paymentHistory"
                  className={({ isActive }) =>
                    isActive ? "underline text-lime-600" : "text-black"
                  }
                >
                  <FaMoneyCheckAlt className="inline mr-2" /> Payment History
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/trackPackage"
                  className={({ isActive }) =>
                    isActive ? "underline text-lime-600" : "text-black"
                  }
                >
                  <FaSearchLocation className="inline mr-2" /> Track Package
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/updateProfile"
                  className={({ isActive }) =>
                    isActive ? "underline text-lime-600" : "text-black"
                  }
                >
                  <FaUserEdit className="inline mr-2" /> Update Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/activeRiders"
                  className={({ isActive }) =>
                    isActive ? "underline text-lime-600" : "text-black"
                  }
                >
                  <FaCheck className=" inline mr-2"></FaCheck>
                  Active Riders
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/pendingRiders"
                  className={({ isActive }) =>
                    isActive ? "underline text-lime-600" : "text-black"
                  }
                >
                  <FaUserClock className="inline mr-2" /> Pending Riders
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <div className=" mb-2">
            <Link to="/">
              <div className=" flex  items-end">
                <img className=" mb-1" src={logo} alt="" />
                <p className=" -ml-2 text-3xl font-extrabold">ProFast</p>
              </div>
            </Link>
          </div>
          <li>
            <NavLink
              to="/dashboard/home"
              className={({ isActive }) =>
                isActive ? "underline text-lime-600" : "text-black"
              }
            >
              <FaHome className="inline mr-2" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/myParcel"
              className={({ isActive }) =>
                isActive ? "underline text-lime-600" : "text-black"
              }
            >
              <FaBox className="inline mr-2" /> My Parcel
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/paymentHistory"
              className={({ isActive }) =>
                isActive ? "underline text-lime-600" : "text-black"
              }
            >
              <FaMoneyCheckAlt className="inline mr-2" /> Payment History
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/trackPackage"
              className={({ isActive }) =>
                isActive ? "underline text-lime-600" : "text-black"
              }
            >
              <FaSearchLocation className="inline mr-2" /> Track Package
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/updateProfile"
              className={({ isActive }) =>
                isActive ? "underline text-lime-600" : "text-black"
              }
            >
              <FaUserEdit className="inline mr-2" /> Update Profile
            </NavLink>
          </li>
          {!isLoading && isRider && (
            <>
              <li>
                <NavLink
                  to="/dashboard/pendingDelivery"
                  className={({ isActive }) =>
                    isActive ? "underline text-lime-600" : "text-black"
                  }
                >
                  <FaTasks className="inline mr-2" />
                  Pending Delivery
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/completeDelivery"
                  className={({ isActive }) =>
                    isActive ? "underline text-lime-600" : "text-black"
                  }
                >
                  <FaCheck className="inline mr-2" />
                  Complete Delivery
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/myEarnings"
                  className={({ isActive }) =>
                    isActive ? "underline text-lime-600" : "text-black"
                  }
                >
                  <FaWallet className="inline mr-2" />
                  My Earnings
                </NavLink>
              </li>
            </>
          )}
          {!isPending && isAdmin && (
            <>
              <li>
                <NavLink
                  to="/dashboard/assignRiders"
                  className={({ isActive }) =>
                    isActive ? "underline text-lime-600" : "text-black"
                  }
                >
                  <MdAssignmentTurnedIn className="inline mr-2" />
                  Assign Riders
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/activeRiders"
                  className={({ isActive }) =>
                    isActive ? "underline text-lime-600" : "text-black"
                  }
                >
                  <FaCheck className=" inline mr-2"></FaCheck>
                  Active Riders
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/pendingRiders"
                  className={({ isActive }) =>
                    isActive ? "underline text-lime-600" : "text-black"
                  }
                >
                  <FaUserClock className="inline mr-2" /> Pending Riders
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/makeAdmin"
                  className={({ isActive }) =>
                    isActive ? "underline text-lime-600" : "text-black"
                  }
                >
                  <MdAdminPanelSettings className="inline mr-2" /> Make Admin
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
