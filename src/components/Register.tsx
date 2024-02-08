"use client";
import { FaUser, FaLock, FaEye, FaRegEyeSlash, FaGoogle } from "react-icons/fa";
import { useContext, useState } from "react";
import { IoMail } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { Context } from "@/context/context";

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const { signUp } = useContext(Context);
  const patenMail: any = /\w+@\w+.(com|org)/gi;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const submit = (data: any) => {
    signUp(data);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="max-w-64">
      <div>
        <div className="w-full rounded-md px-2 flex  gap-2 items-center bg-[#EAF0F7]">
          <FaUser color="gray" />
          <input
            {...register("userName", { required: true })}
            className="w-full h-full outline-none bg-transparent py-2 rounded-md"
            placeholder="User Name"
            type="text"
          />
        </div>
        {errors.userName && (
          <small className="text-xSm text-red-600 px-2">
            field is required!
          </small>
        )}
      </div>
      <div>
        <div className="w-full mt-4 rounded-md px-2 flex  gap-2 items-center bg-[#EAF0F7]">
          <IoMail color="gray" />
          <input
            {...register("email", { required: true, pattern: patenMail })}
            className="w-full h-full outline-none bg-transparent py-2 rounded-md"
            placeholder="Enter Email"
            type="text"
          />
        </div>
        {errors.email && (
          <small className="text-xSm text-red-600 px-2">
            enter valid mail!
          </small>
        )}
      </div>
      <div>
        <div className="w-full relative mt-4 rounded-md px-2 flex  gap-2 items-center bg-[#EAF0F7]">
          <FaLock color="gray" />
          <input
            {...register("password", { required: true, minLength: 6 })}
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
            minimum password = 6
          </small>
        )}
      </div>
      <button className="w-full outline-none text-center bg-blue-500 mt-3 py-1 text-white rounded-lg duration-500 hover:bg-blue-700">
        Register
      </button>
    </form>
  );
};

export default Register;
