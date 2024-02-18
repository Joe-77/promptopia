import getUser from "@/auth/getUser";
import { DeletePost } from "@/data/data";
import Link from "next/link";
import { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";

export default function Menu({ id, postId, data }: any) {
  const currentUser: any = getUser();

  const [showToggle, setShowToggle] = useState(false);

  return (
    <>
      {id === currentUser?.uid && (
        <div className="relative">
          <span
            onClick={() => setShowToggle(!showToggle)}
            className="text-xl cursor-pointer"
          >
            <CiMenuKebab />
          </span>
          {showToggle && (
            <div className="flex flex-col gap-2 absolute z-30 top-6 left-[-50px]">
              <button className="bg-blue-600 px-2 py-1 rounded-md text-white capitalize tracking-widest text-sm">
                <Link
                  href={{
                    pathname: `/edit-post/${postId}`,
                    query: {
                      ...data,
                    },
                  }}
                >
                  edit
                </Link>
              </button>
              <button
                onClick={() => DeletePost(postId)}
                className="bg-red-600 px-2 py-1 rounded-md text-white capitalize tracking-widest text-sm"
              >
                delete
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
