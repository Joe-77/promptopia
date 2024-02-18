import getUser from "@/auth/getUser";
import { Context } from "@/context/context";
import { storage } from "@/firebase/firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Image from "next/image";
import { useContext } from "react";
import { toast } from "react-toastify";

const UpdatePostPhoto = ({
  photo,
  register,
  setCurrentImg,
  setProgress,
}: any) => {
  const currentUser: any = getUser();
  const { setTimeProgress } = useContext(Context);

  const upload = async (e: any) => {
    const storageRef = ref(
      storage,
      `posts/${currentUser.uid}/${e.target.files[0].name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setTimeProgress(progress);
        setProgress(progress);
      },
      (error) => {
        toast.error("uploaded failed! try again");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProgress(null);
          setCurrentImg(downloadURL);
          toast.success("uploaded successfully");
        });
      }
    );
  };

  return (
    <>
      {photo ? (
        <div className="w-[250px] relative">
          <label htmlFor="post-photo" className="w-full cursor-pointer">
            <Image
              className="rounded-md"
              width={250}
              height={250}
              alt=""
              src={photo}
            />
          </label>
          <input
            onChange={upload}
            className="hidden"
            type="file"
            id="post-photo"
          />
        </div>
      ) : (
        <input onChange={upload} type="file" />
      )}
    </>
  );
};

export default UpdatePostPhoto;
