"use client";
import { FaUser, FaLock, FaEye, FaRegEyeSlash, FaGoogle } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import { IoMail } from "react-icons/io5";

const Register = () => {
  const [showPass, setShowPass] = useState(false);

  return (
    <form className="max-w-64">
      <div className="w-full rounded-md px-2 flex  gap-2 items-center bg-[#EAF0F7]">
        <FaUser color="gray" />
        <input
          className="w-full h-full outline-none bg-transparent py-2 rounded-md"
          placeholder="User Name"
          type="text"
        />
      </div>
      <div className="w-full mt-4 rounded-md px-2 flex  gap-2 items-center bg-[#EAF0F7]">
        <IoMail color="gray" />
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
      <button className="w-full text-center bg-blue-500 mt-3 py-1 text-white rounded-lg duration-500 hover:bg-blue-700">
        Register
      </button>
    </form>
  );
};

export default Register;
