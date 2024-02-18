"use client";
import Image from "next/image";
import logo from "../../assets/images/logo.svg";
import user from "../../assets/images/user.png";
import Link from "next/link";
import { useContext, useState } from "react";
import { Context } from "@/context/context";
import getUser from "@/auth/getUser";

const Nav = () => {
  const { isLogin, handleSignOut } = useContext(Context);
  const [dropdown, setDropdown] = useState(false);
  const currentUser: any = getUser();

  return (
    <nav className="px-4 sm:px-0 container m-auto flex justify-between items-center py-5 pb-10">
      <Link
        onClick={() => setDropdown(false)}
        className="flex items-center gap-3"
        href={"/"}
      >
        <Image src={logo} width={50} height={50} alt="logo" />
        <span className="max-sm:hidden text-2xl font-bold tracking-wider">
          Share Prompt
        </span>
      </Link>

      {/* Mobile */}
      {isLogin ? (
        <>
          <div className="relative sm:hidden">
            <button onClick={() => setDropdown(!dropdown)}>
              {currentUser?.photoURL ? (
                <Image
                  className="rounded-full"
                  src={currentUser.photoURL}
                  width={70}
                  height={70}
                  alt=""
                />
              ) : (
                <Image
                  className="rounded-full"
                  src={user}
                  width={70}
                  height={70}
                  alt=""
                />
              )}
            </button>
            {dropdown && (
              <div className="dropdown absolute z-50 left-[-50px] mt-2 flex flex-col gap-3">
                <button className="bg-white shadow-xl p-2 rounded-xl">
                  <Link onClick={() => setDropdown(false)} href="/profile">
                    My Profile
                  </Link>
                </button>
                <button className="bg-black text-white p-2 rounded-2xl text-sm duration-500 hover:bg-transparent hover:text-black border-[1px] border-black">
                  <Link onClick={() => setDropdown(false)} href={"/new-post"}>
                    Create Post
                  </Link>
                </button>
                <button
                  onClick={handleSignOut}
                  className="bg-transparent text-black px-3 py-2 rounded-2xl text-sm duration-500 hover:bg-black hover:text-white border-[1px] border-black"
                >
                  <Link onClick={() => setDropdown(false)} href={"/"}>
                    Sign Out
                  </Link>
                </button>
              </div>
            )}
          </div>

          {/* Desktop */}
          <div className="max-sm:hidden flex items-center gap-4">
            <button className="bg-black text-white p-2 rounded-2xl text-sm duration-500 hover:bg-transparent hover:text-black border-[1px] border-black">
              <Link href={"/new-post"}>Create Post</Link>
            </button>
            <button
              onClick={handleSignOut}
              className="bg-transparent text-black px-3 py-2 rounded-2xl text-sm duration-500 hover:bg-black hover:text-white border-[1px] border-black"
            >
              <Link href={"/"}>Sign Out</Link>
            </button>
            <button>
              <Link href={"/profile"}>
                {currentUser?.photoURL ? (
                  <Image
                    className="rounded-full"
                    src={currentUser.photoURL}
                    width={70}
                    height={70}
                    alt=""
                  />
                ) : (
                  <Image
                    className="rounded-full"
                    src={user}
                    width={70}
                    height={70}
                    alt=""
                  />
                )}
              </Link>
            </button>
          </div>
        </>
      ) : (
        <button className="bg-blue-500 px-2 py-1 rounded-xl text-white">
          <Link href="/login">Sign In</Link>
        </button>
      )}
    </nav>
  );
};

export default Nav;
