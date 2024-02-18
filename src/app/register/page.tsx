import Link from "next/link";
import logo from "../../../assets/images/login.png";
import Image from "next/image";
import Register from "@/components/Register";

const register = () => {
  return (
    <section className="w-full mt-20 px-3 md:px-0 sm:w-3/4 m-auto flex flex-col items-center sm:items-start sm:flex-row max-md:gap-15 gap-20 min-h-screen">
      <div className="flex gap-5">
        <div>
          <h2 className="text-3xl font-bold">
            Sign Up to <br />{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-orange-500 font-mono">
              Promptopia
            </span>
          </h2>
          <p className="text-sm mt-9 leading-5">
            if you have an account <br /> you can{" "}
            <Link className="text-blue-700 font-bold" href="login">
              Sign In now!
            </Link>
          </p>
        </div>
        <div>
          <Image
            className="w-60 max-lg:hidden md:w-[400px]"
            src={logo}
            alt="login"
          />
        </div>
      </div>
      <Register />
    </section>
  );
};

export default register;
