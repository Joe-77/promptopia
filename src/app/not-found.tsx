import Image from "next/image";
import not_found from "../../assets/images/not_found.png";
const not = () => {
  return (
    <div className="h-[80vh] flex items-center justify-center">
      <div className="relative">
        <Image src={not_found} alt="" width={300} height={300} />
      </div>
    </div>
  );
};

export default not;
