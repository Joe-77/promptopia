import { auth, db } from "@/firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { redirect, useRouter } from "next/navigation";
import { useMutation, UseMutationOptions } from "react-query";
import { toast } from "react-toastify";

interface User {
  userName: string;
  email: string;
  password: string;
}

interface Login {
  email: string;
  password: string;
}

export const createNewUser = () => {
  const createUser = async (user: User) => {
    const name = user.userName;
    const mail = user.email;
    const password = user.password;

    await createUserWithEmailAndPassword(auth, mail, password).then(
      (userCredential) => {
        const user = userCredential.user;
        const userRef = doc(db, "users", user.uid);

        updateProfile(user, {
          displayName: name,
        });

        setDoc(userRef, {
          id: user.uid,
          displayName: name,
          email: mail,
          join: new Date(),
        });
      }
    );

    return Promise.resolve(user);
  };

  const mutationOptions: UseMutationOptions<User, unknown, User> = {
    mutationFn: (user) => createUser(user),
  };

  return useMutation<User, unknown, User>(mutationOptions);
};

export const loginWithMailAndPassword = () => {
  const signIn = async (user: Login) => {
    const mail = user.email;
    const password = user.password;

    await signInWithEmailAndPassword(auth, mail, password);

    return Promise.resolve(user);
  };

  return useMutation({
    mutationFn: (user: Login) => signIn(user),
  });
};

export const resetPass = () => {
  const router = useRouter();
  const reset = async (user: { email: string }) => {
    const email = user.email;
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.info("check your mail to change new password");
        router.push("/login");
      })
      .catch(() => {
        toast.error("email is not found");
      });

    return Promise.resolve(user);
  };

  return useMutation({
    mutationFn: (user: { email: string }) => reset(user),
  });
};
