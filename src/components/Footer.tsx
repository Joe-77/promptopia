import Link from "next/link";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white shadow-md shadow-black py-3 px-6 flex justify-between items-center">
      <p className="text-xs">
        &copy; copyright {new Date().getFullYear()}{" "}
        <span className="text-orange-600 font-bold">Promptopia</span>
      </p>
      <div className="text-2xl flex gap-3">
        <Link
          className="text-rose-500 duration-500 hover:text-rose-800 hover:scale-150"
          target="_blank"
          href="https://web.facebook.com/yousef.abdallah.40"
        >
          <FaFacebookF />
        </Link>
        <Link
          className="text-rose-500 duration-500 hover:text-rose-800 hover:scale-150"
          target="_blank"
          href="https://www.linkedin.com/in/yousef-abdallah-760273242/"
        >
          <FaLinkedinIn />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
