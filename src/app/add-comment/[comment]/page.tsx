"use client";
import GetUser from "@/auth/getUser";
import user from "../../../../assets/images/user.png";
import { useContext } from "react";
import { Context } from "@/context/context";
import { redirect } from "next/navigation";
import Image from "next/image";
import { SlActionRedo } from "react-icons/sl";
import { useForm } from "react-hook-form";
import ShowComments from "@/components/ShowComments";

const Comment = ({ searchParams }: any) => {
  const currentUser: any = GetUser();
  const { isLogin, handleAddComment } = useContext(Context);
  const postId: any = searchParams.postId;
  const commentNum = Number(searchParams.comment);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  if (!isLogin) {
    return redirect("/login");
  
  const submit = (comment: any) => {
    const data = {
      title: comment.title,
      createdAt: new Date(),
      comment: commentNum,
      id: postId,
      userPost: postId,
      author: {
        id: currentUser.uid,
        userName: currentUser?.displayName,
        photo: currentUser?.photoURL,
      },
    };

    handleAddComment(data);
  };

  return (
    <section className="py-5 px-3 sm:px-0 min-h-[80vh]">
      <div className="card w-full sm:w-3/5 lg:w-2/6 m-auto shadow-sm shadow-black px-3 py-4 rounded-md relative max-h-[500px] overflow-auto ">
        <form
          onSubmit={handleSubmit(submit)}
          className=" border-b-[1px] border-b-gray-200 pb-2"
        >
          <div className="flex gap-3">
            <div className="relative h-12 w-12">
              <Image
                src={currentUser?.photoURL ? currentUser?.photoURL : user}
                alt=""
                fill
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <div className="w-full flex items-center gap-2">
              <textarea
                {...register("title", { required: true })}
                placeholder="comment..."
                className="outline-none border-2 border-[#ddd] rounded-md px-2 py-1 w-11/12"
                rows={2}
              ></textarea>
              <button type="submit" className="text-xl text-gray-400">
                <SlActionRedo />
              </button>
              {errors.title && (
                <span className=" absolute right-14 text-2xl text-red-700">
                  !
                </span>
              )}
            </div>
          </div>
        </form>
        <ShowComments postId={postId} commentNum={commentNum} />
      </div>
    </section>
  );
};

export default Comment;
