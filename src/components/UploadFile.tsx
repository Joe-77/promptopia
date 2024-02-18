import getUser from "@/auth/getUser";
import { Context } from "@/context/context";
import { storage } from "@/firebase/firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useContext } from "react";
import { toast } from "react-toastify";

function UploadFile({ file, setProgress, required, register, errors }: any) {
  const currentUser: any = getUser();
  const { setTimeProgress } = useContext(Context);

  const upload = (e: any) => {
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
        setProgress(progress);
        setTimeProgress(progress);
      },
      (error) => {
        toast.error("uploaded failed! try again");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          file(downloadURL);
          setProgress(100);
          toast.success("uploaded successfully");
        });
      }
    );
  };

  return (
    <div onChange={upload} className="mt-5">
      <div className="flex">
        <input
          className="w-fit"
          {...register("photo", { required: true })}
          type="file"
        />
      </div>
      {errors.photo && (
        <small className="text-xs block mt-1 text-red-600">
          field is required
        </small>
      )}
    </div>
  );
}

export default UploadFile;
