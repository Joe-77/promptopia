"use client";

import getUser from "@/auth/getUser";
import UploadFile from "@/components/UploadFile";
import { Context } from "@/context/context";
import { redirect, useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

const newPost = () => {
  const { isLogin, handleCreatePost } = useContext(Context);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const route = useRouter();
  const [changeFiles, setChangeFiles] = useState(null);
  const [progress, setProgress]: any = useState(100);
  const currentUser: any = getUser();
  const { timeProgress } = useContext(Context);

  if (!isLogin) {
    return redirect("/login");
  }

  const handlePublishPost = (data: any) => {
    const postDetails = {
      title: data.title,
      photo: changeFiles,
      createdAt: new Date(),
      comment: 0,
      author: {
        id: currentUser.uid,
        name: currentUser.displayName,
        userPhoto: currentUser.photoURL,
      },
    };
    handleCreatePost(postDetails);
  };

  return (
    <section className="mt-3 w-3/4 sm:w-2/5 py-3 mx-auto min-h-[80vh]">
      <div>
        <h1 className="text-2xl text-center capitalize text-black font-bold tracking-widest pb-5">
          new post
        </h1>

        <form onSubmit={handleSubmit(handlePublishPost)}>
          <div className="shadow-sm shadow-black relative">
            <textarea
              maxLength={100}
              {...register("title", { required: true, maxLength: 100 })}
              rows={3}
              className="outline-none w-full border-2 border-transparent px-2 py-1"
              placeholder="what's is your mind?"
            ></textarea>
            {errors.title && (
              <small className=" absolute right-[-10px] text-red-600 text-xl">
                !
              </small>
            )}
          </div>
          <UploadFile
            register={register}
            required={require}
            errors={errors}
            file={setChangeFiles}
            setProgress={setProgress}
          />
          <div className="mt-5 flex justify-end items-center gap-3">
            {progress !== 100 ? (
              <button
                disabled
                className="px-2 py-1 rounded-md bg-gray-400 text-black duration-500 capitalize cursor-not-allowed"
              >
                {Math.round(timeProgress)}%
              </button>
            ) : (
              <button className="px-2 py-1 rounded-md bg-blue-500 text-white duration-500 hover:bg-blue-700 capitalize">
                publish
              </button>
            )}
            <div
              onClick={() => route.push("/")}
              className="cursor-pointer bg-red-600 text-white px-2 py-1 rounded-md capitalize duration-500 hover:bg-red-700"
            >
              cancel
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default newPost;
