"use client";
import { FaUser, FaLock, FaEye, FaRegEyeSlash, FaGoogle } from "react-icons/fa";
import { useContext, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Context } from "@/context/context";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  const { login, loginWithGoogle } = useContext(Context);

  const handleSubmitLogin = (data: {}) => {
    login(data);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitLogin)} className="max-w-64">
      <div>
        <div className="w-full rounded-md px-2 flex  gap-2 items-center bg-[#EAF0F7]">
          <FaUser color="gray" />
          <input
            {...register("email", { required: true })}
            className="w-full h-full outline-none bg-transparent py-2 rounded-md"
            placeholder="Enter Email"
            type="text"
          />
        </div>
        {errors.email && (
          <small className="text-xSm text-red-600 px-2">
            field is required!
          </small>
        )}
      </div>
      <div>
        <div className="w-full relative mt-4 rounded-md px-2 flex  gap-2 items-center bg-[#EAF0F7]">
          <FaLock color="gray" />
          <input
            {...register("password", { required: true })}
            className="w-full h-full outline-none bg-transparent py-2 rounded-md"
            placeholder="*******"
            type={`${showPass ? "text" : "password"}`}
          />
          <span
            onClick={() => setShowPass(!showPass)}
            className="cursor-pointer"
          >
            {showPass ? <FaRegEyeSlash /> : <FaEye />}
          </span>
        </div>
        {errors.password && (
          <small className="text-xSm text-red-600 px-2">
            field is required!
          </small>
        )}
      </div>
      <span className="text-xs flex justify-end mt-3 text-gray-400">
        <Link href="reset-password">Recover Password ?</Link>
      </span>
      <button className="w-full text-center bg-blue-500 mt-3 py-1 text-white rounded-lg duration-500 hover:bg-blue-700">
        Sign In
      </button>
      <div className="w-full h-[1px] bg-gray-400 mt-7 relative another"></div>
      <div className="mt-7">
        <div
          onClick={loginWithGoogle}
          className="w-full cursor-pointer flex justify-center items-center gap-2 bg-red-500 py-2 rounded-lg text-xl text-white duration-500 hover:bg-red-700"
        >
          <FaGoogle />
        </div>
      </div>
      
    </form>
  );
};

export default Login;
