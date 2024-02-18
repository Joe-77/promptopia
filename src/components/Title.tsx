const Title = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="font-bold text-2xl text-center">
        Discover & Share <br className="max-md:hidden" />{" "}
        <span className="text-center text-transparent bg-clip-text bg-gradient-to-br from-pink-300 to-orange-600">
          Ai-Powered Prompts
        </span>
      </h1>
      <p className="text-center text-xs sm:text-sm mt-2 leading-6 px-2 sm:px-0">
        Promptopia is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts
      </p>
    </div>
  );
};

export default Title;
