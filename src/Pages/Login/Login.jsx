import React, { use } from "react";
import { useForm } from "react-hook-form";
import { Link, replace, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxios from "../../Hooks/useAxios/useAxios";
import toast from "react-hot-toast";

const Login = () => {
  const { googleSignIn, signInUser } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosInstance = useAxios();
  // console.log(location);
  const from = location.state?.from?.pathname || "/";
  // location.state?.from?.pathname
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // console.log(data);
    const email = data.email;
    const password = data.password;
    // console.log(email, password);
    signInUser(email, password)
      .then((result) => {
        // console.log(result);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        alert(
          "email or password is not valid.please enter valid email or password."
        );
      });
  };
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        // console.log(result);
        const userInfo = {
          email: result.user.email,
          name: result.user.displayName,
          role: "user",
          photo: result.user.photoURL,
          createAt: new Date().toISOString(),
        };
        // console.log(userInfo);
        axiosInstance
          .post("/users", userInfo)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            if (err.response?.status === 409) {
              console.log(err.response.data.message);
            }
          });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div
      className="w-full max-w-md p-8  rounded-xl  text-gray-800"
      bis_skin_checked="1"
    >
      <h1 className="text-4xl mb-1 font-bold">Welcome Back</h1>
      <p className=" text-lg mb-5 text-gray-500">Login with Profast</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate=""
        action=""
        className="space-y-3"
      >
        <div className="space-y-1 text-sm" bis_skin_checked="1">
          <label htmlFor="Email" className="block text-gray-600">
            Email
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-md border border-gray-300 text-gray-800 "
          />
          {errors.email?.type === "required" && (
            <span className=" text-red-500">Email is required</span>
          )}
        </div>
        <div className="space-y-1 text-sm " bis_skin_checked="1">
          <label htmlFor="password" className="block text-gray-600">
            Password
          </label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: { value: 6 },
            })}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-md  border-gray-300 border  "
          />
          {errors.password?.type === "required" && (
            <span className=" text-red-500">Password is required</span>
          )}
          {errors.password?.type === "minLength" && (
            <span className=" text-red-500">
              Password must be at least 6 character or longer
            </span>
          )}
          <div
            className="flex underline justify-start text-xs text-gray-600"
            bis_skin_checked="1"
          >
            <a rel="noopener noreferrer" href="#">
              Forgot Password?
            </a>
          </div>
        </div>
        <button className="btn w-full rounded-sm  bg-lime-400">Login</button>
      </form>
      <div className=" mt-2">
        <span>
          Don't have an account ?{" "}
          <Link to="/register" className=" underline hover:text-blue-500">
            Register
          </Link>
        </span>
      </div>
      <div className="flex items-center pt-4 space-x-1" bis_skin_checked="1">
        <div
          className="flex-1 h-px sm:w-16 bg-gray-300"
          bis_skin_checked="1"
        ></div>
        <p className="px-3 text-sm text-gray-600">Login with social accounts</p>
        <div
          className="flex-1 h-px sm:w-16 bg-gray-300"
          bis_skin_checked="1"
        ></div>
      </div>
      {/* Google */}
      <button
        onClick={handleGoogleSignIn}
        className="btn w-full mt-2 bg-white text-black border-[#e5e5e5]"
      >
        <svg
          aria-label="Google logo"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <path d="m0 0H512V512H0" fill="#fff"></path>
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            ></path>
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            ></path>
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            ></path>
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            ></path>
          </g>
        </svg>
        Login with Google
      </button>
    </div>
  );
};

export default Login;
