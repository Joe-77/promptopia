"use client";
import GetUser from "@/auth/getUser";
import UpdatePostPhoto from "@/components/UpdatePostPhoto";
import { Context } from "@/context/context";
import { redirect } from "next/navigation";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

const Edit = ({ searchParams }: any) => {
  const [currenImg, setCurrentImg] = useState(searchParams.photo);
  const [progress, setProgress] = useState(null);
  const { isLogin, handleUpdatePost, timeProgress } = useContext(Context);
  const currentUser: any = GetUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  if (!isLogin) {
    return redirect("/login");
  }

  const handlerUpdatePost = (data: any) => {
    const updateData = {
      postId: searchParams.id,
      title: data.title,
      photo: currenImg,
      updated: true,
      createdAt: new Date(),
      userPhoto: currentUser?.photoURL,
    };
    handleUpdatePost(updateData);
  };

  return (
    <section className="px-3 sm:px-0 sm:w-3/5 mx-auto mt-5 min-h-screen">
      <h1 className="pb-5 text-2xl font-bold font-mono text-orange-600 italic animate-bounce">
        Update Post
      </h1>
      <form onSubmit={handleSubmit(handlerUpdatePost)}>
        <div>
          <textarea
            {...register("title", { required: true })}
            rows={5}
            className="w-3/4 sm:w-1/2 resize-none p-2 outline-none border-2 border-[#ddd] rounded-md"
          >
            {searchParams?.title}
          </textarea>
        </div>
        {errors.title && (
          <small className="text-red-500 text-xs pb-2 block">
            field is required!
          </small>
        )}
        <UpdatePostPhoto
          photo={searchParams.photo}
          register={register}
          setCurrentImg={setCurrentImg}
          setProgress={setProgress}
        />
        <div className="mt-3 w-3/4 sm:w1/2">
          {progress !== null ? (
            <div className="flex gap-4">
              <button
                disabled
                className="px-2 py-1 rounded-md text-black bg-gray-500 cursor-not-allowed "
              >
                Update
              </button>
              <span className="bg-gray-400 px-2 py-1 rounded-full text-[10px] text-white flex items-center justify-center w-8 h-8">
                {Math.round(timeProgress)}%
              </span>
            </div>
          ) : (
            <button className="px-2 py-1 rounded-md text-white bg-blue-500 duration-500 hover:bg-blue-700">
              Update
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default Edit;
