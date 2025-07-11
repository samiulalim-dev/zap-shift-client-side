import axios from "axios";
import React, { use, useEffect } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "https://zap-shift-server-khaki.vercel.app",
});
const useAxiosSecure = () => {
  const { user, logOut } = use(AuthContext);
  // console.log(user.accessToken);
  const navigate = useNavigate();
  useEffect(() => {
    // Clear any existing interceptors to avoid duplicates
    axiosSecure.interceptors.request.eject(
      axiosSecure.interceptors.request.handlers[0]?.id
    );
    // request interceptor
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user?.email && user?.accessToken) {
          config.headers.Authorization = `Bearer ${user.accessToken}`; // attach token
        } else {
          delete config.headers.authorization;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    // Add a response interceptor
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 403) {
          navigate("/forbidden");
        } else if (error.response.status === 401) {
          logOut()
            .then(() => {
              navigate("/login");
            })
            .catch((error) => {});
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on component unmount or when users change
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.request.eject(responseInterceptor);
    };
  }, [user]);
  return axiosSecure;
};

export default useAxiosSecure;
