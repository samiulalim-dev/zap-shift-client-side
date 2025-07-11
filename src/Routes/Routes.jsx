import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home";
import AuthLayout from "../AuthLayout/AuthLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import CoverageMap from "../Pages/CoverageMap/CoverageMap";
import LoadingSpinner from "../Components/Loading/LoadingSpinner";
import AddParcel from "../Pages/AddParcel/AddParcel";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Myparcel from "../Pages/Dashboard/Myparcel/Myparcel";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import BeARider from "../Pages/BeARider/BeARider";
import PendingRiders from "../Pages/Dashboard/PendingRiders/PendingRiders";
import ActiveRiders from "../Pages/Dashboard/ActiveRiders/ActiveRiders";
import MakeAdmin from "../Pages/Dashboard/MakeAdmin/MakeAdmin";
import AdminRoute from "../PrivateRoute/AdminRoute/Adminroute";
import Forbidden from "../Pages/Forbidden/Forbidden";
import AssignRiders from "../Pages/Dashboard/AssignRiders/AssignRiders";
import RiderRoute from "../PrivateRoute/RiderRoute/RiderRoute";
import PendingDelivery from "../Pages/Dashboard/PendingDelivery/PendingDelivery";
import CompleteDelivery from "../Pages/Dashboard/CompleteDelivery/CompleteDelivery";
import MyEarnings from "../Pages/Dashboard/MyEarnings/MyEarnings";
import TrackPackage from "../Pages/Dashboard/TrackPackage/TrackPackage";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
      {
        path: "/coverage",
        Component: CoverageMap,
        loader: () => fetch("/warehouses.json"),
        hydrateFallbackElement: <LoadingSpinner></LoadingSpinner>,
      },
      {
        path: "forbidden",
        Component: Forbidden,
      },
      {
        path: "addParcel",
        element: (
          <PrivateRoute>
            <AddParcel></AddParcel>
          </PrivateRoute>
        ),
        loader: () => fetch("/warehouses.json"),
        hydrateFallbackElement: <LoadingSpinner></LoadingSpinner>,
      },
      {
        path: "/BeARider",
        element: (
          <PrivateRoute>
            <BeARider></BeARider>
          </PrivateRoute>
        ),
        loader: () => fetch("/warehouses.json"),
        hydrateFallbackElement: <LoadingSpinner></LoadingSpinner>,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        index: true,
        path: "home",
        Component: DashboardHome,
      },
      {
        path: "myParcel",
        Component: Myparcel,
      },
      {
        path: "payment/:id",
        Component: Payment,
      },
      {
        path: "paymentHistory",
        Component: PaymentHistory,
      },
      {
        path: "trackPackage",
        Component: TrackPackage,
      },
      {
        path: "pendingRiders",

        element: (
          <AdminRoute>
            <PendingRiders></PendingRiders>
          </AdminRoute>
        ),
      },
      {
        path: "activeRiders",

        element: (
          <AdminRoute>
            <ActiveRiders></ActiveRiders>
          </AdminRoute>
        ),
      },
      {
        path: "makeAdmin",

        element: (
          <AdminRoute>
            <MakeAdmin></MakeAdmin>
          </AdminRoute>
        ),
      },
      {
        path: "assignRiders",
        element: (
          <AdminRoute>
            <AssignRiders></AssignRiders>
          </AdminRoute>
        ),
      },
      // rider route
      {
        path: "pendingDelivery",
        element: (
          <RiderRoute>
            <PendingDelivery></PendingDelivery>
          </RiderRoute>
        ),
      },
      {
        path: "completeDelivery",
        element: (
          <RiderRoute>
            <CompleteDelivery></CompleteDelivery>
          </RiderRoute>
        ),
      },
      {
        path: "myEarnings",
        element: (
          <RiderRoute>
            <MyEarnings></MyEarnings>
          </RiderRoute>
        ),
      },
    ],
  },
]);
