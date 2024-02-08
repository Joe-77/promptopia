"use client";
import { Context } from "@/context/context";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";

const ResetPass = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  const patenMail: any = /\w+@\w+.(com|org)/gi;
  const { reset } = useContext(Context);

  const handleResetPassword = (data: any) => {
    reset(data);
  };

  return (
    <form onSubmit={handleSubmit(handleResetPassword)} className="max-w-64">
      <div>
        <div className="w-full rounded-md px-2 flex  gap-2 items-center bg-[#EAF0F7]">
          <FaUser color="gray" />
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
      <button className="w-full outline-none text-center bg-red-500 mt-3 py-1 text-white rounded-lg duration-500 hover:bg-red-700">
        Reset
      </button>
    </form>
  );
};

export default ResetPass;
