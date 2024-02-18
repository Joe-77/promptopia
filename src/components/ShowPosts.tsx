"use client";
import { GetAllPost } from "@/data/data";
import moment from "moment";
import Image from "next/image";
import Menu from "./Menu";
import { FidgetSpinner } from "react-loader-spinner";
import { AiFillMessage } from "react-icons/ai";
import { useContext } from "react";
import { Context } from "@/context/context";
import Link from "next/link";

const ShowPosts = () => {
  const { data, isLoading } = GetAllPost();

  return (
    <div className="mt-16 pb-5 min-h-[80vh]">
      {isLoading && (
        <span className="flex justify-center w-full mt-28">
          <FidgetSpinner
            visible={true}
            height="80"
            width="80"
            ariaLabel="fidget-spinner-loading"
            wrapperStyle={{}}
            wrapperClass="fidget-spinner-wrapper"
          />
        </span>
      )}

      {data?.length === 0 ? (
        <small className="text-2xl flex justify-center text-red-600 capitalize italic font-bold mt-28 animate-pulse">
          no found data!
        </small>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-10 px-3 sm:px-0">
          {data?.map((e: any, id: number) => (
            <div key={id}>
              <div className="card shadow-md shadow-slate-400 px-3 py-2 rounded-md">
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    {e.author?.userPhoto ? (
                      <Image
                        className="rounded-full"
                        src={e.author?.userPhoto}
                        width={50}
                        height={50}
                        alt=""
                      />
                    ) : (
                      <div className="text-3xl text-black bg-green-700 capitalize w-12 h-12 rounded-full flex items-center justify-center">
                        {e.author.name[0]}
                      </div>
                    )}
                    <span>
                      <h2 className="text-xl text-teal-600 font-bold flex items-center gap-1">
                        {e.author.name}{" "}
                        {e?.updated && (
                          <span className="text-xs text-black">(updated)</span>
                        )}
                      </h2>
                      <small className="text-xs text-gray-400">
                        {moment(e.createdAt.toDate()).fromNow()}
                      </small>
                    </span>
                  </div>
                  <Menu id={e.author.id} postId={e?.id} data={e} />
                </div>
                <div className="pt-5">
                  <h5 className="text-sm">{e.title}</h5>
                  {e?.photo && (
                    <div className="relative mt-2 w-full h-[500px] sm:h-96 lg:h-[450px] ">
                      <Image
                        className="rounded-md"
                        fill
                        objectFit="cover"
                        src={e.photo}
                        alt=""
                      />
                    </div>
                  )}
                </div>
              </div>
              <Link
                href={{
                  pathname: `/add-comment/${e.id}`,
                  query: {
                    comment: e.comment,
                    postId: e.id,
                  },
                }}
                className="mt-3 px-4 flex items-center gap-1 w-fit"
              >
                <span className="text-xl">
                  <AiFillMessage />
                </span>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowPosts;
