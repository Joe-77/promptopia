"use client";
import { Context } from "@/context/context";
import { redirect } from "next/navigation";
import { useContext } from "react";
import user from "../../../assets/images/user.png";
import getUser from "@/auth/getUser";
import Image from "next/image";
import Link from "next/link";
import PostUser from "@/components/PostUser";

interface UserData {
  displayName: string;
  email: any;
}

const Page = () => {
  const { isLogin } = useContext(Context);
  const currentUser: UserData | any = getUser();

  if (!isLogin) {
    return redirect("/login");
  }

  return (
    <section className="min-h-screen">
      <div className="w-64 sm:w-80 m-auto">
        <div className="card w-full rounded-xl bg-white shadow-md shadow-gray-500 px-2 pt-10 pb-5 ">
          {currentUser?.photoURL ? (
            <Image
              className="m-auto rounded-full"
              src={currentUser.photoURL}
              width={600}
              height={300}
              alt="user"
            />
          ) : (
            <Image
              className="m-auto rounded-full"
              src={user}
              width={300}
              height={300}
              alt="user"
            />
          )}
          <p className="text-sm px-3 py-5 font-bold">
            User Name :{" "}
            <span className="text-orange-500">{currentUser?.displayName}</span>
          </p>
          <p className="text-sm px-3 font-bold">
            Email :{" "}
            <span className="text-orange-500">{currentUser?.email}</span>
          </p>
        </div>
        <div className="flex justify-end mt-3">
          <button className="bg-blue-600 p-2 rounded-lg text-xs text-white duration-500 hover:bg-blue-700">
            <Link href="update-profile">Update Profile</Link>
          </button>
        </div>
      </div>
      <PostUser />
    </section>
  );
};

export default Page;
