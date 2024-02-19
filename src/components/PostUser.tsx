"use client";
import { GetAllPost } from "@/data/data";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import Menu from "./Menu";
import { AiFillMessage } from "react-icons/ai";
import GetUser from "@/auth/getUser";
import { DNA } from "react-loader-spinner";
const PostUser = () => {
  const currentUser: any = GetUser();
  const { data, isLoading } = GetAllPost();
  const allData = data?.filter((e: any) => e.author?.id === currentUser?.uid);

  return (
    <div className="container mx-auto mt-20 px-3 sm:px-0 pb-20">
      {isLoading && (
        <span className="flex justify-center w-full mt-28">
          <DNA
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </span>
      )}
      {allData?.length === 0 ? (
        <span className="text-lg flex justify-center mt-20 font-bold items-center gap-1">
          <small>you don&apos;t have posts</small>
          <Link
            className="text-sm text-rose-700 animate-pulse underline"
            href="/new-post"
          >
            create now
          </Link>
        </span>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-10 px-3 sm:px-0">
          {allData?.map((e: any, id: number) => (
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
                        You
                        {e?.updated && (
                          <span className="text-xs text-black">(updated)</span>
                        )}
                      </h2>
                      <small className="text-xs text-gray-400">
                        {moment(e.createdAt.toDate()).fromNow()}
                      </small>
                    </span>
                  </div>
                  <Menu id={e.author?.id} postId={e?.id} data={e} />
                </div>
                <div className="pt-5">
                  <h5 className="text-sm">{e.title}</h5>
                  {e?.photo && (
                    <div className="relative mt-2 w-full h-[500px] sm:h-96 lg:h-[450px]">
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

export default PostUser;
