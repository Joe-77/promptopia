import {
  createNewUser,
  loginWithMailAndPassword,
  resetPass,
  updateUserProfile,
} from "@/auth/auth";
import getUser from "@/auth/getUser";
import { addComment, addPost, updatePost } from "@/data/data";
import { auth, db, provider, storage } from "@/firebase/firebaseConfig";
import { handleFirebaseAuthErrors } from "@/utility/firebaseError";
import { deleteUser, signInWithPopup, signOut } from "firebase/auth";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

interface Users {
  userName: string;
  email: string;
  password: string;
}

export const Context = createContext<any>(undefined);

export const AuthContextProvider = ({ children }: { children: any }) => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const signUpUser = createNewUser();
  const loginWithMailAndPass: any = loginWithMailAndPassword();
  const forgetPass = resetPass();
  const editProfile = updateUserProfile();
  const currentUser: any = getUser();
  const cretePost = addPost();
  const handleEditPost = updatePost();
  const comment = addComment();
  const [timeProgress, setTimeProgress] = useState(0);

  const signUp = (data: Users) => {
    signUpUser.mutateAsync(data, {
      onSuccess: () => {
        toast.success("Account created successfully");
        router.push("/login");
      },
      onError: (error: any) => {
        handleFirebaseAuthErrors(error);
      },
    });
  };

  const login = (user: Users) => {
    loginWithMailAndPass.mutateAsync(user, {
      onSuccess: () => {
        toast.success("Login Successfully");
        setIsLogin(true);
        router.push("/");
      },
      onError: (error: any) => {
        handleFirebaseAuthErrors(error);
      },
    });
  };

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, provider)
      .then(async (data: any) => {
        const user = data.user;
        const userRef = doc(db, "users", user.uid);

        await setDoc(userRef, {
          id: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user?.photoURL,
          join: new Date(),
        });
        toast.success("Login Successfully");
        setIsLogin(true);
        router.push("/");
      })
      .catch((error) => {
        handleFirebaseAuthErrors(error);
      });
  };

  const reset = (email: { email: string }) => {
    forgetPass.mutateAsync(email);
  };

  const handleSignOut = async () => {
    await signOut(auth).then(() => {
      toast.success("Logout Successfully");
      setIsLogin(false);
    });
  };

  const handleUpdate = (data: { userName: string; photo: any }) => {
    editProfile.mutateAsync(data);
  };

  const handleUpdatePost = (data: any) => {
    handleEditPost.mutateAsync(data);
  };

  const handleDeleteCurrentUser = async () => {
    await deleteUser(currentUser)
      .then(() => {
        deleteDoc(doc(db, "users", currentUser.uid));
        toast.success("account deleted successfully");
        setIsLogin(false);
      })
      .catch(() => {
        toast.error("deleted failed! try again");
      });
  };

  const handleCreatePost = (data: any) => {
    cretePost.mutateAsync(data);
  };

  const handleAddComment = (post: any) => {
    comment.mutateAsync(post);
  };

  return (
    <Context.Provider
      value={{
        isLogin,
        signUp,
        login,
        loginWithGoogle,
        reset,
        handleSignOut,
        handleUpdate,
        handleDeleteCurrentUser,
        handleCreatePost,
        handleUpdatePost,
        handleAddComment,
        timeProgress,
        setTimeProgress,
      }}
    >
      {children}
    </Context.Provider>
  );
};
