import { GetAllComments } from "@/data/data";
import user from "../../assets/images/user.png";
import Image from "next/image";
import moment from "moment";
import { Comment } from "react-loader-spinner";
import DeleteComment from "./DeleteComment";

const ShowComments = ({ postId, commentNum }: any) => {
  const { data, isLoading } = GetAllComments();
  const allData = data?.filter((e: any) => e.userPost === postId);

  return (
    <div className="mt-4 max-h-96 overflow-y-auto scrollbar-none">
      {isLoading && (
        <span className="flex justify-center w-full mt-8">
          <Comment
            visible={true}
            height="80"
            width="80"
            ariaLabel="comment-loading"
            wrapperStyle={{}}
            wrapperClass="comment-wrapper"
            color="#fff"
            backgroundColor="#F4442E"
          />
        </span>
      )}

      {allData?.length === 0 ? (
        <small className="text-2xl flex justify-center text-red-600 capitalize italic pt-5 font-bold  animate-pulse">
          no found comment!
        </small>
      ) : (
        <>
          {allData?.map((e: any, id: number) => (
            <div key={id} className="mb-3 flex justify-between ">
              <div className="flex gap-2">
                <div className="relative w-10 h-10">
                  <Image
                    className="rounded-full"
                    src={e.author?.photo ? e.author.photo : user}
                    alt=""
                    fill
                    objectFit="cover"
                  />
                </div>
                <div className="flex flex-col justify-end items-start">
                  <div className="w-fit bg-gray-500 text-white pl-4 pr-6 py-2 rounded-2xl">
                    <h4 className="text-sm font-bold text-white tracking-wider">
                      {e.author.userName}
                    </h4>
                    <p className="text-sm">{e.title}</p>
                  </div>
                  <p className="text-[10px] mt-2 px-2 text-gray-400">
                    {moment(e.createdAt.toDate()).fromNow().replace("ago", "")}
                  </p>
                </div>
              </div>
              <DeleteComment
                userID={e.author.id}
                commentId={e?.id}
                postId={postId}
                commentNum={commentNum}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ShowComments;
