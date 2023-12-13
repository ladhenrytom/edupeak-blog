import Image from "next/image";

const Loading = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Image src="/loader.svg" width={50} height={50} alt="loader" className="object-contain" />
    </div>
  );
};

export default Loading;
