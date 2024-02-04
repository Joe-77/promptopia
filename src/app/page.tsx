import Image from "next/image";

export default function Home() {
  return (
    <section className="w-full flex flex-col justify-center items-center">
      <h1 className="font-bold text-2xl text-center">
        Discover & Share <br className="max-md:hidden" />{" "}
        <span className="text-center text-transparent bg-clip-text bg-gradient-to-br from-pink-300 to-orange-600">
          Ai-Powered Prompts
        </span>
      </h1>
      <p className="text-center text-sm mt-2 leading-6">
        Promptopia is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts
      </p>
    </section>
  );
}
