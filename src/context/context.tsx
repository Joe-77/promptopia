import {
  createNewUser,
  loginWithMailAndPassword,
  resetPass,
  updateUserProfile,
} from "@/auth/auth";
import { auth, db, provider } from "@/firebase/firebaseConfig";
import { handleFirebaseAuthErrors } from "@/utility/firebaseError";
import { signInWithPopup, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
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
  const [isLogin, setIsLogin] = useState(false);
  const signUpUser = createNewUser();
  const loginWithMailAndPass = loginWithMailAndPassword();
  const forgetPass = resetPass();
  const editProfile = updateUserProfile();

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
      }}
    >
      {children}
    </Context.Provider>
  );
};
