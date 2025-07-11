import React, { use, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import axios from "axios";
import useAxios from "../../Hooks/useAxios/useAxios";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const [userProfilePic, setUserProfilePic] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, googleSignIn, updateUser } = use(AuthContext);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    const formData = new FormData();
    formData.append("image", file);
    // console.log(formData);
    axios
      .post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_upload_image_api_key
        }`,
        formData
      )
      .then((res) => {
        setUserProfilePic(res.data.data.url);
      });
  };

  const onSubmit = (data) => {
    // console.log(data);
    const name = data.name;
    const email = data.email;
    const password = data.password;
    createUser(email, password)
      .then((result) => {
        console.log(result);
        const userInfo = {
          email: result.user.email,
          name: name,
          role: "user",
          photo: userProfilePic,
          createAt: new Date().toISOString(),
        };
        // console.log(userInfo);
        axiosInstance
          .post("/users", userInfo)
          .then((res) => {
            toast.success("User created successfully!");
          })
          .catch((error) => {
            toast.error("Something went wrong");
          });
        updateUser(name, userProfilePic)
          .then(() => {
            console.log("update user name and photo");
          })
          .catch((error) => {
            console.log(error);
          });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
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
            // toast.success("User created successfully!");
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
      <h1 className="text-4xl mb-1 font-bold">Create an Account</h1>
      <p className=" text-lg mb-5 text-gray-500">Register with ProFast</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        {/* Photo */}
        <div className="space-y-1 text-sm">
          <label className="block text-gray-600">Photo</label>
          <input
            type="file"
            placeholder="Upload Your image"
            onChange={handleChangeImage}
            className="w-full px-4 py-3 rounded-md border border-gray-300 text-gray-800 "
          />
          {errors.name?.type === "required" && (
            <span className=" text-red-500">Name is Required</span>
          )}
        </div>
        {/* Name */}
        <div className="space-y-1 text-sm">
          <label htmlFor="name" className="block text-gray-600">
            Name
          </label>
          <input
            type="text"
            id="name"
            autoComplete="Full name"
            placeholder="Name"
            {...register("name", {
              required: true,
            })}
            className="w-full px-4 py-3 rounded-md border border-gray-300 text-gray-800 "
          />
          {errors.name?.type === "required" && (
            <span className=" text-red-500">Name is Required</span>
          )}
        </div>
        {/* email */}
        <div className="space-y-1 text-sm">
          <label htmlFor="email" className="block text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: true,
            })}
            placeholder="Email"
            autoComplete="email"
            className="w-full px-4 py-3 rounded-md border border-gray-300 text-gray-800 "
          />
          {errors.email?.type === "required" && (
            <span className=" text-red-500">Email is required</span>
          )}
        </div>
        {/* password */}
        <div className="space-y-1 text-sm ">
          <label htmlFor="password" className="block text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            autoComplete="current-password"
            {...register("password", {
              required: true,
              minLength: { value: 6 },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
              },
            })}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-md  border-gray-300 border  "
          />
          {errors.password?.type === "required" && (
            <span className=" text-red-500">Password is required</span>
          )}
          {errors.password?.type === "minLength" && (
            <span className=" text-red-500">
              Password must be at least 6 character or longer.
            </span>
          )}
          {errors.password?.type === "pattern" && (
            <span className=" text-red-500">
              Must include both uppercase and lowercase letters
            </span>
          )}
          {/* <div
            className="flex underline justify-start text-xs text-gray-600"
            bis_skin_checked="1"
          >
            <a rel="noopener noreferrer" href="#">
              Forgot Password?
            </a>
          </div> */}
        </div>
        <button className="btn w-full rounded-sm bg-lime-400">Register</button>
      </form>
      <div className=" mt-2">
        <span>
          Already have an account ?{" "}
          <Link to="/login" className=" underline hover:text-blue-500">
            Login
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
        Register with Google
      </button>
    </div>
  );
};

export default Register;
