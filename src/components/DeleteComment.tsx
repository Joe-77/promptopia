import getUser from "@/auth/getUser";
import { handleDeleteComment } from "@/data/data";
import { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";

const DeleteComment = ({ userID, commentId, postId, commentNum }: any) => {
  const currentUser: any = getUser();

  const [showToggle, setShowToggle] = useState(false);

  const aboutComment: {
    commentId: string;
    postId: string;
    commentNum: number;
  } = {
    commentId: commentId,
    postId: postId,
    commentNum: commentNum,
  };

  return (
    <>
      <div className="relative">
        {userID === currentUser?.uid && (
          <div>
            <span
              onClick={() => setShowToggle(!showToggle)}
              className="text-xl cursor-pointer"
            >
              <CiMenuKebab />
            </span>
            {showToggle && (
              <button
                onClick={() => handleDeleteComment(aboutComment)}
                className="bg-red-600 px-2 py-1 rounded-md text-white capitalize tracking-widest text-sm absolute z-30 top-6 left-[-50px] select-none"
              >
                delete
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default DeleteComment;
