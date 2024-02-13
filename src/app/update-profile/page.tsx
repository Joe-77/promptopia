"use client";
import getUser from "@/auth/getUser";
import { Context } from "@/context/context";
import { redirect } from "next/navigation";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaPhotoVideo } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

const update = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  const currentUser: any = getUser();
  const { handleUpdate, isLogin } = useContext(Context);

  const handleUpdateUser = (data: any) => {
    handleUpdate(data);
  };

  if (!isLogin) {
    redirect("/login");
  }

  return (
    <section className="w-3/4 m-auto mt-5">
      <h1 className="text-bold text-xl">Update Profile :</h1>
      <form onSubmit={handleSubmit(handleUpdateUser)} className="mt-5">
        <div className="mb-3">
          <div className="w-full sm:w-1/2 lg:w-2/5 rounded-md px-2 flex  gap-2 items-center bg-[#EAF0F7]">
            <FaUser color="gray" />
            <input
              {...register("userName", { required: true })}
              className="w-full h-full outline-none bg-transparent py-2 rounded-md"
              type="text"
              placeholder={`${currentUser?.displayName}`}
            />
          </div>
          {errors.userName && (
            <small className="text-xSm text-red-600 px-2">
              field is required!
            </small>
          )}
        </div>
        <div className="w-full sm:w-1/2 lg:w-2/5 rounded-md px-2 flex  gap-2 items-center bg-[#EAF0F7]">
          <IoMail color="gray" />
          <p className="w-full h-full outline-none bg-transparent py-2 rounded-md cursor-not-allowed">
            {currentUser?.email}
          </p>
        </div>
        <div className="w-full sm:w-1/2 lg:w-2/5 rounded-md px-2 flex gap-2 items-center bg-[#EAF0F7] mt-3">
          <FaPhotoVideo color="gray" />
          <input
            {...register("photo")}
            className="w-full h-full outline-none bg-transparent py-2 rounded-md cursor-not-allowed"
            type="file"
          />
        </div>
        <div className="mt-5 flex items-center justify-between w-full sm:w-1/2 lg:w-2/5">
          <button
            type="submit"
            className="text-sm text-white duration-500 bg-blue-500 hover:bg-blue-700 px-2 py-1 rounded-lg font-bold"
          >
            Update
          </button>
          <button className="text-sm text-white duration-500 bg-red-500 hover:bg-red-700 px-2 py-1 rounded-lg font-bold ">
            Delete Account
          </button>
        </div>
      </form>
    </section>
  );
};

export default update;
