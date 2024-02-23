import { auth, db, storage } from "@/firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { useRouter } from "next/navigation";
import { useMutation, UseMutationOptions } from "react-query";
import { toast } from "react-toastify";
import getUser from "./getUser";
import { GetAllPost } from "@/data/data";

interface User {
  userName: string;
  email: string;
  password: string;
}

interface Login {
  email: string;
  password: string;
}

export const CreateNewUser = () => {
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
          photoURL: "",
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

export const LoginWithMailAndPassword = () => {
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

export const ResetPass = () => {
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
    onSuccess: () => {
      router.push("/login");
    },
  });
};

export const UpdateUserProfile = () => {
  const currentUser: { uid: string } | any = getUser();
  const router = useRouter();
  const { data }: any = GetAllPost();

  const handleUpdate = (userData: { userName: string; photo: any }) => {
    const userName = userData.userName;
    const photo = userData?.photo[0];
    const photoName = photo.name;
    const userRef = doc(db, "users", currentUser.uid);

    if (photo) {
      const storageRef = ref(storage, `images/${currentUser.uid}/${photoName}`);
      const uploadTask = uploadBytesResumable(storageRef, photo);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          toast.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(currentUser, {
              displayName: userName,
              photoURL: downloadURL,
            });

            await setDoc(userRef, {
              id: currentUser.uid,
              displayName: userName,
              email: currentUser.email,
              photoURL: downloadURL,
            });

            if (data?.length !== 0) {
              data?.map((e: any) => {
                if (e.author.id === currentUser?.uid) {
                  updateDoc(doc(db, "posts", e.id), {
                    author: {
                      id: currentUser?.uid,
                      userPhoto: downloadURL,
                      name: currentUser?.displayName,
                    },
                  });
                }
              });
            }
          });
        }
      );
    } else {
      updateProfile(currentUser, {
        displayName: userName,
      });

      setDoc(userRef, {
        id: currentUser.uid,
        displayName: userName,
        email: currentUser.email,
      });
    }

    return Promise.resolve(data);
  };

  return useMutation({
    mutationFn: (data: { userName: string; photo: any }) => handleUpdate(data),
    onSuccess: () => {
      toast.success("account updated successfully");
      router.push("/");
    },
    onError: () => {
      toast.error("updated failed! try again");
    },
  });
};
