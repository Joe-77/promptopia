import { db, storage } from "@/firebase/firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";

export const AddPost = () => {
  const router = useRouter();

  const addNewPost = async (post: any) => {
    const postCollectionRef = collection(db, "posts");
    await addDoc(postCollectionRef, post);

    return Promise.resolve(post);
  };

  return useMutation({
    mutationFn: (post: any) => addNewPost(post),
    onSuccess: () => {
      toast.success("publish successfully");
      router.push("/");
    },
    onError: () => {
      toast.error("publish failed! try again");
    },
  });
};

export const GetAllPost = () => {
  const getPosts = async () => {
    const postRef = collection(db, "posts");
    const data = await getDocs(query(postRef, orderBy("createdAt", "desc")));
    const posts = data?.docs.map((e) => ({ ...e.data(), id: e.id }));

    return posts;
  };

  return useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(),
  });
};

export const DeletePost = async (id: string) => {
  const postRef = doc(db, "posts", id);

  await deleteDoc(postRef)
    .then(() => {
      toast.info("deleted successfully");
    })
    .catch(() => {
      toast.error("try again!");
    });
};

export const UpdatePost = () => {
  const router = useRouter();
  const handleUpdatePost = async (data: any) => {
    const postId = data.postId;

    const washingtonRef = doc(db, "posts", postId);

    await updateDoc(washingtonRef, data);
    console.log(postId);
    return Promise.resolve(data);
  };

  return useMutation({
    mutationFn: (data) => handleUpdatePost(data),
    onSuccess: () => {
      toast.success("post updated successfully");
      router.push("/");
    },
    onError: () => {
      toast.error("Oh something wrong! try again");
    },
  });
};

export const AddComment = () => {
  const router = useRouter();

  const handleClickLike = async (comment: any) => {
    const postId = comment.id;
    let num = comment.comment;
    const commentCollectionRef = collection(db, "comments");
    await addDoc(commentCollectionRef, comment);
    await updateDoc(doc(db, "posts", postId), {
      comment: Number(num++),
    });
    return Promise.resolve(comment);
  };

  return useMutation({
    mutationFn: (comment) => handleClickLike(comment),
    onSuccess: () => {
      toast.success("comment added successfully");
      router.push("/");
    },
    onError: () => {
      toast.error("something wrong! try again ");
    },
  });
};

export const GetAllComments = () => {
  const getComments = async () => {
    const commentRef = collection(db, "comments");
    const data = await getDocs(query(commentRef, orderBy("createdAt", "desc")));
    const posts = data?.docs.map((e) => ({ ...e.data(), id: e.id }));

    return posts;
  };

  return useQuery({
    queryKey: ["comments"],
    queryFn: () => getComments(),
  });
};

export const HandleDeleteComment = async (aboutData: {
  commentId: string;
  postId: string;
  commentNum: number;
}) => {
  const commentRef = doc(db, "comments", aboutData.commentId);

  await deleteDoc(commentRef)
    .then(() => {
      updateDoc(doc(db, "posts", aboutData.postId), {
        comment: aboutData.commentNum - 1,
      });
      toast.info("Deleted Successfully");
    })
    .catch(() => {
      toast.error("something error! try again");
    });
};
