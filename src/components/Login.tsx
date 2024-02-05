"use client";
import { FaUser, FaLock, FaEye, FaRegEyeSlash, FaGoogle } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";

const Login = () => {
  const [showPass, setShowPass] = useState(false);

  return (
    <form className="max-w-64">
      <div className="w-full rounded-md px-2 flex  gap-2 items-center bg-[#EAF0F7]">
        <FaUser color="gray" />
        <input
          className="w-full h-full outline-none bg-transparent py-2 rounded-md"
          placeholder="Enter Email"
          type="text"
        />
      </div>
      <div className="w-full relative mt-4 rounded-md px-2 flex  gap-2 items-center bg-[#EAF0F7]">
        <FaLock color="gray" />
        <input
          className="w-full h-full outline-none bg-transparent py-2 rounded-md"
          placeholder="*******"
          type={`${showPass ? "text" : "password"}`}
        />
        <span onClick={() => setShowPass(!showPass)} className="cursor-pointer">
          {showPass ? <FaRegEyeSlash /> : <FaEye />}
        </span>
      </div>
      <span className="text-xs flex justify-end mt-3 text-gray-400">
        <Link href="reset-password">Recover Password ?</Link>
      </span>
      <button className="w-full text-center bg-blue-500 mt-3 py-1 text-white rounded-lg duration-500 hover:bg-blue-700">
        Sign In
      </button>
      <div className="w-full h-[1px] bg-gray-400 mt-7 relative another"></div>
      <div className="mt-7">
        <div className="w-full cursor-pointer flex justify-center items-center gap-2 bg-red-500 py-2 rounded-lg text-xl text-white duration-500 hover:bg-red-700">
          <FaGoogle />
        </div>
      </div>
    </form>
  );
};

export default Login;
